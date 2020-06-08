import { setupServer } from 'msw/node';
import { FailOptions } from '../api/mock.utils';
import { itemsMocks } from '../api/items/items.mocks';
import { getItemsWithFetch, deleteWithFetch } from './items-fetch';

const failOptions: FailOptions = {
  failRate: 1, // always
  failCode: 502,
  failText: 'MOCKED TEST ERROR',
};

const server = setupServer(...itemsMocks());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getItemsWithFetch', () => {
  it('gets items', async () => {
    const result = await getItemsWithFetch();
    expect(result).toHaveLength(3);
  });

  it('handles server error', async () => {
    server.use(...itemsMocks({ failOptions }));
    try {
      await getItemsWithFetch();
      fail('Unexpected success');
    } catch (err) {
      expect(err.status).toBe(failOptions.failCode);
      expect(err.message).toBe(failOptions.failText);
    }
  });

  describe('deleteWithFetch', () => {
    it('deletes item', async () => {
      const result = await deleteWithFetch('Item1');
      expect(result).toHaveLength(2);
    });

    it('handles server error', async () => {
      server.use(...itemsMocks({ failOptions }));
      try {
        await deleteWithFetch('Item1');
        fail('Unexpected success');
      } catch (err) {
        expect(err.status).toBe(failOptions.failCode);
        expect(err.message).toBe(failOptions.failText);
      }
    });
  });
});
