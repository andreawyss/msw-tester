import { rest } from "msw";
import {
  delayAmount,
  shouldFail,
  failResponse,
  FailOptions,
} from "../mock.utils";

const items = ["Item1", "Item2", "Item3"];

const getHandler = (failOptions: FailOptions = {}) =>
  rest.get(`/items`, (req, res, ctx) => {
    if (shouldFail(failOptions)) {
      return failResponse(req, res, ctx, failOptions);
    }

    return res(ctx.delay(delayAmount), ctx.status(200, "OK"), ctx.json(items));
  });

const deleteHandler = (failOptions: FailOptions = {}) =>
  rest.delete(`/items/:item`, (req, res, ctx) => {
    if (shouldFail(failOptions)) {
      return failResponse(req, res, ctx, failOptions);
    }

    const { item } = req.params;
    const index = items.findIndex((i) => i === item);
    if (index !== -1) {
      items.splice(index, 1);
    }

    return res(ctx.delay(delayAmount), ctx.status(200, "OK"), ctx.json(items));
  });

export const itemsMocks = (failOptions: FailOptions = {}) => [
  getHandler(failOptions),
  deleteHandler(failOptions),
];
