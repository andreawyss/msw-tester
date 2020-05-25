import { setupServer } from "msw/node";
import { itemsMocks } from "../api/items/items.mocks";
import { getItemsWithFetch, deleteWithFetch } from "./items-fetch";

describe("items-fetch", () => {
  const server = setupServer(...itemsMocks());

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("gets items with fetch", async () => {
    const result = await getItemsWithFetch();
    expect(result).toHaveLength(3);
  });

  it("delete item with fetch", async () => {
    const result = await deleteWithFetch("Item1");
    expect(result).toHaveLength(2);
  });
});
