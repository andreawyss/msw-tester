import { rest } from 'msw';
import {
  failResponse,
  shouldFail,
  mockLatency,
  SetupOptions,
} from '../mock.utils';

const items = ['Item1', 'Item2', 'Item3'];

const getHandler = (setupOptions: SetupOptions) =>
  rest.get(`/items`, (req, res, ctx) => {
    if (shouldFail(setupOptions)) {
      return failResponse(req, res, ctx, setupOptions);
    }

    return res(mockLatency(ctx), ctx.status(200, 'OK'), ctx.json(items));
  });

const deleteHandler = (setupOptions: SetupOptions) =>
  rest.delete(`/items/:item`, (req, res, ctx) => {
    if (shouldFail(setupOptions)) {
      return failResponse(req, res, ctx, setupOptions);
    }

    const { item } = req.params;
    const index = items.findIndex((i) => i === item);
    if (index !== -1) {
      items.splice(index, 1);
    }

    return res(mockLatency(ctx), ctx.status(200, 'OK'), ctx.json(items));
  });

export const itemsMocks = (setupOptions: SetupOptions = {}) => [
  getHandler(setupOptions),
  deleteHandler(setupOptions),
];
