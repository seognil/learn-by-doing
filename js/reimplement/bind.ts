// * ================================================================================ original

{
  const obj = {
    val: 'inner',
    fn(...args: any[]) {
      console.warn(...args, this);
    },
  };

  obj.fn(333);

  const rawFn = obj.fn;
  rawFn(666);

  const bindedFn = obj.fn.bind({ val: 'outer' });
  bindedFn(999);

  const bindedFn2 = bindedFn.bind({ val: 'more' });
  bindedFn2(0);
}

console.log('--------');

// * ================================================================================ our

{
  const bind = <T, K>(context: any, fn: (...args: T[]) => K) => (...args: T[]) =>
    fn.apply(context, args);

  // * ----------------

  const obj = {
    val: 'inner',
    fn(...args: any[]) {
      console.warn(...args, this);
    },
  };

  obj.fn(333);

  const rawFn = obj.fn;
  rawFn(666);

  const bindedFn = bind({ val: 'outer' }, obj.fn);
  bindedFn(999);

  const bindedFn2 = bind({ val: 'more' }, bindedFn);
  bindedFn2(0);
}
