import { ResponseTransformer } from 'msw/lib/types';

const isTest = process.env.NODE_ENV === 'test';

const latencyAmount = isTest ? 1 : 700;

export const mockLatency = (ctx: {
  delay: (value: number) => ResponseTransformer;
}) => {
  return ctx.delay(latencyAmount);
};
