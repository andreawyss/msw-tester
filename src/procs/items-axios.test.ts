import { setupServer } from "msw/node";
import { thingsMocks } from "../api/items/items.mocks";
import { getItemsWithAxios } from "./items-axios";

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
});
