// * 也可以改成 Map<string, Promise<void>[]>，数组的形式，当最后一个任务完成后（manualRes 调用时）删除 key，以便节约内存
const chainMap = new Map<string, Promise<void>>();

const keyLock = async (key: string) => {
  if (!chainMap.get(key)) chainMap.set(key, Promise.resolve());
  const chain = chainMap.get(key)!;

  let prevPromise = chain;

  // * 将 resolve 提到外部，以便实现手动触发
  let waitingRes: Function;
  let nextPromise = new Promise<void>((res) => {
    waitingRes = res;
  });

  chainMap.set(
    key,
    chain.then(() => nextPromise),
  );

  await prevPromise;

  return waitingRes!;
};

// * ================================================================================

import { delay } from '../util/delay';

async function process(key: string, msg?: string) {
  let release = await keyLock(key);
  console.log('get locker', key, msg);

  await delay(1000);

  console.log('end locker', key, msg);
  release();
}

process('key1', 'dog');
process('key1', 'cat');
process('key2', 'Macbook');
// process('key3', 'JavaScript');
// process('key3', 'TypeScript');
// process('key3', 'ClojureScript');
// process('key3', 'Rust');
// process('key3', 'Haskell');
