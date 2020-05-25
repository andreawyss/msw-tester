import { MockedRequest } from "msw";
import { ResponseComposition } from "msw/lib/types/response";

const isTest = process.env.NODE_ENV === "test";

export const delayAmount = isTest ? 1 : 700;

export type FailOptions = {
  /** The failure statusCode */
  failCode?: number;

  /** The failure rate. Number between 0 and 1.
   * - 0=never
   * - 1=always */
  failRate?: number;

  /** The failure statusText */
  failText?: string;
};

export function shouldFail(failOptions: FailOptions = {}) {
  const { failRate = 0 } = failOptions;
  return failRate === 1 || (failRate !== 0 && Math.random() < failRate);
}

export function failResponse(
  req: MockedRequest,
  res: ResponseComposition,
  ctx: any,
  failOptions: FailOptions = {}
) {
  return res(
    ctx.delay(delayAmount),
    ctx.status(failOptions.failCode, failOptions.failText)
  );
}
