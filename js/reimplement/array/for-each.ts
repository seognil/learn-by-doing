// * ================================================================================ original

{
  [1, 2, 3].forEach((e, i, a) => {
    console.log(e, i, a);
  });
}

console.log('--------');

// * ================================================================================ our

{
  const forEach = <T, K>(fn: (e: T, i: number, a: T[]) => void, arr: T[]): void => {
    for (let i = 0; i < arr.length; i++) {
      fn(arr[i], i, arr);
    }
  };

  forEach(
    (e, i, a) => {
      console.log(e, i, a);
      return 'hello' + e;
    },
    [6, 7, 8],
  );
}
