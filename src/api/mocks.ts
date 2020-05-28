import { setupWorker } from 'msw';
import { FailOptions } from './mock-setup';
import { itemsMocks } from './items/items.mocks';

const failOptions: FailOptions = {
  failRate: 0.2, // 20%
  failCode: 499,
  failText: 'Simulated Failure',
};

export const worker = setupWorker(...itemsMocks({ failOptions }));
