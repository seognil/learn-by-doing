import { delay } from '../util/delay';

type AsyncFunction = () => Promise<unknown>;

const limitOf = (max: number) => {
  const mq: AsyncFunction[] = [];
  let count = 0;

  const runTask = async (fn: AsyncFunction) => {
    count++;
    await fn();
    count--;
    if (mq.length) runTask(mq.shift()!);
  };

  return (fn: AsyncFunction) => {
    count < max ? runTask(fn) : mq.push(fn);
  };
};

// * ================================================================================

const limit = limitOf(2);

for (let i = 1; i < 10; i++) {
  limit(async () => {
    await delay(500);
    console.warn(i);
  });
}
