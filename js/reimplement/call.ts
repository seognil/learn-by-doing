// * ================================================================================ original

{
  const obj = {
    val: 'inner',
    fn(...args: unknown[]) {
      console.warn(...args, this);
    },
  };
  obj.fn(333);

  obj.fn.call({ val: 'outer' }, 666);
}

console.log('--------');

// * ================================================================================ our

{
  const call = <C, T>(context: C, fn: Function, ...args: T[]) => {
    const sf = Symbol();

    Object.defineProperty(context, sf, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: fn,
    });

    const sc: C & { [sf]?: Function } = context;
    const result = sc[sf]?.(...args);
    delete sc[sf];

    return result;
  };

  // * ----------------

  const obj = {
    val: 'inner',
    fn(...args: any[]) {
      console.warn(...args, this);
    },
  };
  obj.fn(333);

  call({ val: 'outer' }, obj.fn, 666);
}
