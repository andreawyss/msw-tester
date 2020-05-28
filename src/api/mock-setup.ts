import { MockedRequest } from 'msw';
import { ResponseComposition } from 'msw/lib/types/response';
import { mockLatency } from './mock-latency';

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
  ctx: any,
  setupOptions: SetupOptions = {}
) {
  const { failOptions = {} } = setupOptions;
  const {
    failCode = 555,
    failText = 'Mocked Error',
  }: FailOptions = failOptions;

  return res(mockLatency(ctx), ctx.status(failCode, failText));
}
