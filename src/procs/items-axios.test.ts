import { setupServer } from "msw/node";
import { thingsMocks } from "../api/items/items.mocks";
import { getItemsWithAxios, deleteWithAxios } from "./items-axios";

describe("items-axios", () => {
  const server = setupServer(...thingsMocks);

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("gets items with axios", async () => {
    const result = await getItemsWithAxios();
    expect(result).toHaveLength(2);
  });

  it("delete item with axios", async () => {
    const result = await deleteWithAxios("Item1");
    expect(result).toHaveLength(1);
  });
});
