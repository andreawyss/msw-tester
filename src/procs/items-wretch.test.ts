import { setupServer } from 'msw/node';
import { FailOptions } from '../api/mock.utils';
import { itemsMocks } from '../api/items/items.mocks';
import { getItemsWithWretch, deleteWithWretch } from './items-wretch';

const failOptions: FailOptions = {
  failRate: 1, // always
  failCode: 502,
  failText: 'MOCKED TEST ERROR',
};

const server = setupServer(...itemsMocks());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getItemsWithWretch', () => {
  it('gets items', async () => {
    const result = await getItemsWithWretch();
    expect(result).toHaveLength(3);
  });

  it('handles server error', async () => {
    server.use(...itemsMocks({ failOptions }));
    await expect(getItemsWithWretch()).rejects.toThrowError(
      `Request failed with status code ${failOptions.failCode}: ${failOptions.failText}`
    );
  });

  describe('deleteWithWretch', () => {
    it('deletes item', async () => {
      const result = await deleteWithWretch('Item1');
      expect(result).toHaveLength(2);
    });

    it('handles server error', async () => {
      server.use(...itemsMocks({ failOptions }));
      await expect(deleteWithWretch('Item1')).rejects.toThrowError(
        `Request failed with status code ${failOptions.failCode}: ${failOptions.failText}`
      );
    });
  });
});
