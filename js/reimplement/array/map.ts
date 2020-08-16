// * ================================================================================ original

{
  const result = [1, 2, 3].map((e, i, a) => {
    console.log(e, i, a);
    return 'hello' + e;
  });

  console.log(result);
}

console.log('--------');

// * ================================================================================ our

{
  const map = <T, K>(fn: (e: T, i: number, a: T[]) => K, arr: T[]): K[] => {
    const result: K[] = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  };

  const result = map(
    (e, i, a) => {
      console.log(e, i, a);
      return 'hello' + e;
    },
    [6, 7, 8],
  );

  console.log(result);
}
