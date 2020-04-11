// * 也可以做成高阶函数，以便生成多个 lock 独立运作

let chain = Promise.resolve();

export const singleLock = async () => {
  let prevPromise = chain;

  // * 将 resolve 提到外部，以便实现手动触发
  let manualRes: Function;
  let nextPromise = new Promise<void>((res) => {
    manualRes = res;
  });

  chain = chain.then(() => nextPromise);

  await prevPromise;

  return manualRes!;
};

// * ================================================================================

import { delay } from '../util/delay';

async function process(msg: string) {
  let release = await singleLock();
  console.log('get locker', msg);

  await delay(1000);

  console.log('end locker', msg);
  release();
}

process('JavaScript');
process('TypeScript');
process('ClojureScript');
process('Rust');
process('Haskell');
