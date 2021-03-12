// * ================================================================================ original

{
  const obj = {
    val: 'inner',
    fn(...args: unknown[]) {
      console.warn(...args, this);
    },
  };

  obj.fn('obj call');

  const rawFn = obj.fn;
  rawFn('raw call');

  const bindedFn = obj.fn.bind({ val: 'outer' });
  bindedFn('bind1');

  const bindedFn2 = bindedFn.bind({ val: 'more' });
  bindedFn2('bind2');
}

console.log('--------');

// * ================================================================================ our

{
  const bind = <C, T, K>(context: C, fn: (...args: T[]) => K) => {
    const sf = Symbol();

    Object.defineProperty(context, sf, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: fn,
    });

    const sc: C & { [sf]?: Function } = context;

    return (...args: T[]) => sc[sf]?.(...args) as K;
  };

  // * ----------------

  const obj = {
    val: 'inner',
    fn(...args: unknown[]) {
      console.warn(...args, this);
    },
  };

  obj.fn('obj call');

  const rawFn = obj.fn;
  rawFn('raw call');

  const bindedFn = bind({ val: 'outer' }, obj.fn);
  bindedFn('bind1');

  const bindedFn2 = bind({ val: 'more' }, bindedFn);
  bindedFn2('bind2');
}
