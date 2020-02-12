// * ------------------------------------------------ Optional Chaining

{
  const data = { bar: { baz: console.log } };

  type validData = typeof data | null;

  const foo: validData = Math.random() ? data : null;

  const x = foo?.bar?.baz();

  console.log('x is', x);
}

// * ---------------- alternative

{
  const data = { bar: { baz: console.log } };

  type validData = typeof data | null;

  const foo: validData = Math.random() ? data : null;

  const x =
    foo === null || foo === undefined
      ? undefined
      : foo.bar === null || foo.bar === undefined
      ? undefined
      : foo.bar.baz();

  console.log('x is', x);
}

// * ------------------------------------------------ Non-null assertion operator

{
  interface Entity {
    name: string;
  }

  const validOrThrow = (e) => {
    if (!e) throw 'your value is empty';
  };

  const process = (e?: Entity) => {
    validOrThrow(e);

    const name = e!.name;
    console.log(name);
  };

  process({ name: 'Mick' });
}

// * ---------------- alternative

{
  interface Entity {
    name: string;
  }

  const validOrThrow = (e) => {
    if (!e) throw 'your value is empty';
  };

  const process = (e?: Entity) => {
    validOrThrow(e);

    const name = e !== undefined && e.name;
    console.log(name);
  };

  process({ name: 'Mick' });
}

// * ------------------------------------------------ Nullish Coalescing

{
  const foo = null;
  const bar = () => 'John';

  const x = foo ?? bar();

  console.log('x is', x);
}

// * ---------------- alternative

{
  const foo = null;
  const bar = () => 'John';

  const x = foo !== null && foo !== undefined ? foo : bar();

  console.log('x is', x);
}

// * ------------------------------------------------ overload

{
  function simpleAdd(a: number): (b: number) => number;
  function simpleAdd(a: number, b: number): number;
  function simpleAdd(a, b?) {
    if (b === undefined) return (b) => a + b;
    return a + b;
  }

  const result = simpleAdd(1, 2);
  console.log(result);

  const semiAdd = simpleAdd(3);
  const result2 = semiAdd(4);
  console.log(result2);
}

// * ------------------------------------------------ Pattern matching

// * not support
