import { MockedRequest } from 'msw';
import { ResponseTransformer } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';

type baseContext = {
  delay: (durationMs: number) => ResponseTransformer;
  status: (
    statusCode: number,
    statusText?: string | undefined
  ) => ResponseTransformer;
};

const isTest = process.env.NODE_ENV === 'test';

const latencyAmount = isTest ? 1 : 700;

export const mockLatency = (ctx: baseContext) => {
  return ctx.delay(latencyAmount);
};

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

export type SetupOptions = {
  failOptions?: FailOptions;
};

export function shouldFail(setupOptions: SetupOptions = {}) {
  const { failOptions = {} } = setupOptions;
  const { failRate = 0 }: FailOptions = failOptions;
  return Math.random() < failRate;
}

export function failResponse(
  req: MockedRequest,
  res: ResponseComposition,
  ctx: baseContext,
  setupOptions: SetupOptions = {}
) {
  const { failOptions = {} } = setupOptions;
  const {
    failCode = 555,
    failText = 'Mocked Error',
  }: FailOptions = failOptions;

  return res(mockLatency(ctx), ctx.status(failCode, failText));
}
