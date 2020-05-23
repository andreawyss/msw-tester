import { setupWorker } from "msw";

import { thingsMocks } from "./items/items.mocks";

export const worker = setupWorker(...thingsMocks);
