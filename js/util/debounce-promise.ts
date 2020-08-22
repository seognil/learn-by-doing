{
  // * ------------------------------------------------ debounceP

  const debounceP = <T extends any[], K>(fn: (...args: T) => Promise<K>, duration = 0) => {
    let tick: NodeJS.Timeout;

    let singleP: Promise<K> | null;
    let singleRes: ((value: K) => void) | null;
    let singleRej: ((reason?: any) => void) | null;

    return (...args: T) => {
      if (singleP) {
        clearTimeout(tick);
      } else {
        singleP = new Promise<K>((res, rej) => {
          singleRes = res;
          singleRej = rej;
        });
      }

      tick = setTimeout(() => {
        clearTimeout(tick);
        fn(...args!).then(singleRes, singleRej);
        singleP = singleRes = singleRej = null;
      }, duration);

      return singleP;
    };
  };

  // * ------------------------------------------------ test

  const delay = (n: number) => new Promise((res) => setTimeout(() => res(), n));

  const fn = async (val: number) => {
    console.log('run fn, args:', val);
    await delay(100);
    return val;
  };

  const dFn = debounceP(fn, 500);

  // * ----------------

  (async () => {
    dFn(1).then((e) => (console.log(e), console.assert(e === 3)));
    dFn(2).then((e) => (console.log(e), console.assert(e === 3)));
    dFn(3).then((e) => (console.log(e), console.assert(e === 3)));

    console.log('--------');
    await delay(1000);
    console.log('--------');

    dFn(6).then((e) => (console.log(e), console.assert(e === 8)));
    dFn(7).then((e) => (console.log(e), console.assert(e === 8)));
    dFn(8).then((e) => (console.log(e), console.assert(e === 8)));
  })();
}
