// * ================================================================================ original

{
  const obj = {
    val: 'inner',
    fn(...args: any[]) {
      console.warn(...args, this);
    },
  };
  obj.fn(333);

  obj.fn.call({ val: 'outer' }, 666);
}

console.log('--------');

// * ================================================================================ our

{
  const call = <T>(context: any, fn: Function, ...args: T[]) => {
    let i = 0;
    while (context[`__fn${i}`]) i++;
    const shallowKey = `__fn${i}`;

    Object.defineProperty(context, shallowKey, {
      value: fn,
      enumerable: false,
      configurable: true,
    });

    const result = context[shallowKey](...args);

    delete context[shallowKey];

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
