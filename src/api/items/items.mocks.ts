import { rest } from "msw";

const isTest = process.env.NODE_ENV === "test";
const delay = isTest ? 1 : 700;

const handler1 = rest.get(`/items`, (req, res, ctx) => {
  const result = ["Item1", "Item2"];

  return res(ctx.delay(delay), ctx.status(200, "OK"), ctx.json(result));
});

export const thingsMocks = [handler1];
