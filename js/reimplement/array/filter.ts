// * ================================================================================ original

{
  const result = [1, 2, 3, 4].filter((e, i, a) => {
    const keep = Boolean(e % 2);
    console.log(e, i, a, keep);
    return keep;
  });

  console.log(result);
}

console.log('--------');

// * ================================================================================ our

{
  const filter = <T>(fn: (e: T, i: number, a: T[]) => Boolean | undefined, arr: T[]): T[] => {
    const result: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      fn(arr[i], i, arr) && result.push(arr[i]);
    }
    return result;
  };

  const result = filter(
    (e, i, a) => {
      const keep = Boolean(e % 2);
      console.log(e, i, a, keep);
      return keep;
    },
    [6, 7, 8, 9],
  );

  console.log(result);
}
