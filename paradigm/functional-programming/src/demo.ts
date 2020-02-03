import { curry } from 'ramda';

// * ================================================================================ playground

{
  const toCamel = (str) =>
    str.replace(/[\.\s-]/g, ' ').replace(/\s(\w)/g, (m, l) => l.toUpperCase());

  const input = 'hello-world';
  const title = toCamel(input); // => helloWorld

  console.log(title);
}

// * ================================================================================ FP vs IP

{
  const people = [
    { name: 'Bob Martin', age: 68 },
    { name: 'Dan Abramov', age: 27 },
    { name: 'Joel Spolsky', age: 55 },
  ];

  {
    const result = people.filter((p) => p.age > 35).map((p) => p.name);
    console.log('fp', result);
  }

  {
    const result = [];
    for (let i = 0; i < people.length; i++) {
      const p = people[i];
      if (p.age > 35) result.push(p.name);
    }
    console.log('IP', result);
  }
}

// * ================================================================================ sideEffect

// * ---------------- pure

{
  let two = 2;
  const add = curry((a, b) => a + b);

  const add2 = add(two); // => fn{}
  const result1 = add2(3); // => 5

  two = 2.1;
  const result2 = add2(3); // => 5

  console.log('clean', result1, result2);
}

// * ---------------- impure

{
  let two = 2;

  // * 副作用（引入了外部变量，导致结果不可控）
  const add2 = (b) => two + b;
  const result1 = add2(3); // => 5

  two = 2.1;
  const result2 = add2(3); // => 5.1

  console.log('dirty', result1, result2);
}
