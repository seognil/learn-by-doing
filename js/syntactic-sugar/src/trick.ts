// * ------------------------------------------------ ternary condition operator

{
  const name: string = 'John';

  const msg = name === 'admin' ? 'name is invalid' : 'name is valid';

  console.log(msg);
}

// * ---------------- alternative

{
  const name: string = 'John';

  let msg;
  if (name === 'admin') {
    msg = 'name is invalid';
  } else {
    msg = 'name is valid';
  }

  console.log(msg);
}

// * ------------------------------------------------ short-circuit evaluation

{
  const alias = null;
  const getNickName = () => 'John';
  const getUserName = () => 'User_John';

  const result = alias || getNickName() || getUserName();

  result && console.log(result);
}

// * ---------------- alternative

{
  const alias = null;
  const getNickName = () => 'John';
  const getUserName = () => 'User_John';

  let result: string | null = alias;
  if (!result) result = getNickName();
  if (!result) result = getUserName();

  if (result) {
    console.log(result);
  }
}

// * ------------------------------------------------ quick boolean

{
  const name = 'John';

  const isNameEmpty = !name;
  const isNameNotEmpty = !!name;

  console.log(isNameEmpty, isNameNotEmpty);
}

// * ---------------- alternative

{
  const name: string = 'John';

  const isNameEmpty = name !== '';
  const isNameNotEmpty = Boolean(name);

  console.log(isNameEmpty, isNameNotEmpty);
}

// * ------------------------------------------------ quick Math.Round

{
  const a = ~~2.7;
  const b = ~~-2.7;

  console.log(a, b);
}

// * ---------------- alternative

{
  const a = Math.floor(2.7);
  const b = Math.ceil(-2.7);

  console.log(a, b);
}
