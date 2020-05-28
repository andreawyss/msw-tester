import { setupServer } from 'msw/node';
import { FailOptions } from '../api/mock.utils';
import { itemsMocks } from '../api/items/items.mocks';
import { getItemsWithAxios, deleteWithAxios } from './items-axios';

const failOptions: FailOptions = {
  failRate: 1, // always
  failCode: 501,
  failText: 'MOCKED TEST ERROR',
};

describe('items-axios', () => {
  const server = setupServer(...itemsMocks({ failOptions }));

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('gets items with axios fails', async () => {
    try {
      await getItemsWithAxios();
      fail('Unexpected success');
    } catch (err) {
      expect(err.response.status).toBe(failOptions.failCode);
      expect(err.response.statusText).toBe(failOptions.failText);
    }
  });

  it('delete item with axios fails', async () => {
    try {
      await deleteWithAxios('Item1');
      fail('Unexpected success');
    } catch (err) {
      expect(err.response.status).toBe(failOptions.failCode);
      expect(err.response.statusText).toBe(failOptions.failText);
    }
  });
});
