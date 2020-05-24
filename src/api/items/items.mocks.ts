import { rest } from "msw";

const isTest = process.env.NODE_ENV === "test";
const delay = isTest ? 1 : 700;

const items = ["Item1", "Item2"];

const getHandler = rest.get(`/items`, (req, res, ctx) => {
  return res(ctx.delay(delay), ctx.status(200, "OK"), ctx.json(items));
});

const deleteHandler = rest.delete(`/items/:item`, (req, res, ctx) => {
  const { item } = req.params;
  const index = items.findIndex((i) => i === item);
  if (index !== -1) {
    items.splice(index, 1);
  }

  return res(ctx.delay(delay), ctx.status(200, "OK"), ctx.json(items));
});

export const thingsMocks = [getHandler, deleteHandler];
