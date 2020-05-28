import { setupServer } from 'msw/node';
import { FailOptions } from '../api/mock-setup';
import { itemsMocks } from '../api/items/items.mocks';
import { getItemsWithFetch, deleteWithFetch } from './items-fetch';

const failOptions: FailOptions = {
  failRate: 1, // always
  failCode: 502,
  failText: 'MOCKED TEST ERROR',
};

describe('items-fetch', () => {
  const server = setupServer(...itemsMocks({ failOptions }));

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('gets items with fetch fails', async () => {
    try {
      await getItemsWithFetch();
      fail('Unexpected success');
    } catch (err) {
      expect(err.status).toBe(failOptions.failCode);
      expect(err.message).toBe(failOptions.failText);
    }
  });

  it('delete item with fetch fails', async () => {
    try {
      await deleteWithFetch('Item1');
      fail('Unexpected success');
    } catch (err) {
      expect(err.status).toBe(failOptions.failCode);
      expect(err.message).toBe(failOptions.failText);
    }
  });
});
