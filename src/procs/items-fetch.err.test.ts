import { setupServer } from "msw/node";
import { itemsMocks } from "../api/items/items.mocks";
import { getItemsWithFetch, deleteWithFetch } from "./items-fetch";

const expectedStatusCode = 400;
const expectedStatusText = "TEST ERROR";

describe("items-fetch", () => {
  const server = setupServer(
    ...itemsMocks({
      failRate: 1, // always
      failCode: expectedStatusCode,
      failText: expectedStatusText,
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("gets items with fetch fails", async () => {
    try {
      await getItemsWithFetch();
    } catch (err) {
      expect(err.status).toBe(expectedStatusCode);
      expect(err.message).toBe(expectedStatusText);
    }
  });

  it("delete item with fetch fails", async () => {
    try {
      await deleteWithFetch("Item1");
    } catch (err) {
      expect(err.status).toBe(expectedStatusCode);
      expect(err.message).toBe(expectedStatusText);
    }
  });
});
