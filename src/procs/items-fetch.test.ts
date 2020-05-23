import { setupServer } from "msw/node";
import { thingsMocks } from "../api/items/items.mocks";
import { getItemsWithFetch } from "./items-fetch";

describe("items-fetch", () => {
  const server = setupServer(...thingsMocks);

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("gets items with fetch", async () => {
    const result = await getItemsWithFetch();
    expect(result).toHaveLength(2);
  });
});
