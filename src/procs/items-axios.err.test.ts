import { setupServer } from "msw/node";
import { itemsMocks } from "../api/items/items.mocks";
import { getItemsWithAxios, deleteWithAxios } from "./items-axios";

const expectedStatusCode = 400;
const expectedStatusText = "TEST ERROR";

describe("items-axios", () => {
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

  it.only("gets items with axios fails", async () => {
    try {
      await getItemsWithAxios();
    } catch (err) {
      expect(err.response.status).toBe(expectedStatusCode);
      expect(err.response.statusText).toBe(expectedStatusText);
    }
  });

  it.only("delete item with axios fails", async () => {
    try {
      await deleteWithAxios("Item1");
    } catch (err) {
      expect(err.response.status).toBe(expectedStatusCode);
      expect(err.response.statusText).toBe(expectedStatusText);
    }
  });
});
