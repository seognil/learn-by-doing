import { delay } from '../util/delay';

type AsyncFunction = () => Promise<unknown>;
const limitOf = (max: number) => {
  const mq: AsyncFunction[] = [];
  let count = 0;

  const runTask = async () => {
    if (count < max) {
      count++;
      await mq.shift()!();
      count--;
      checkMq();
    }
  };

  const checkMq = () => {
    if (mq.length) runTask();
  };

  return (fn: AsyncFunction) => {
    mq.push(fn);
    checkMq();
  };
};

// * ================================================================================

const limit = limitOf(2);

console.warn('start');

for (let i = 1; i < 10; i++) {
  limit(async () => {
    await delay(500);
    // await delay(Math.random() * 500 + 100);
    console.warn(i);
  });
}
