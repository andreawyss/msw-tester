import { setupServer } from 'msw/node';
import { FailOptions } from '../api/mock.utils';
import { itemsMocks } from '../api/items/items.mocks';
import { getItemsWithAxios, deleteWithAxios } from './items-axios';

const failOptions: FailOptions = {
  failRate: 1, // always
  failCode: 501,
  failText: 'MOCKED TEST ERROR',
};

const server = setupServer(...itemsMocks());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getItemsWithAxios', () => {
  it('gets items', async () => {
    const result = await getItemsWithAxios();
    expect(result).toHaveLength(3);
  });

  it('handles server error', async () => {
    server.use(...itemsMocks({ failOptions }));
    try {
      await getItemsWithAxios();
      fail('Unexpected success');
    } catch (err) {
      expect(err.response.status).toBe(failOptions.failCode);
      expect(err.response.statusText).toBe(failOptions.failText);
    }
  });
});

describe('deleteWithAxios', () => {
  it('deletes item', async () => {
    const result = await deleteWithAxios('Item1');
    expect(result).toHaveLength(2);
  });

  it('handles server error', async () => {
    server.use(...itemsMocks({ failOptions }));
    try {
      await deleteWithAxios('Item1');
      fail('Unexpected success');
    } catch (err) {
      expect(err.response.status).toBe(failOptions.failCode);
      expect(err.response.statusText).toBe(failOptions.failText);
    }
  });
});
