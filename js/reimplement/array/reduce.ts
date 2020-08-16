// * ================================================================================ original

{
  const data = [1, 2, 3];
  const result = data.reduce((a, e, i) => a + e);
  console.log(data, result);
}

{
  const data = [1, 2, 3];
  const result = data.reduce((a, e, i) => a + e, 1000);
  console.log(data, result);
}

console.log('--------');

// * ================================================================================ our

{
  const reduce = <T, K = T>(arr: T[], fn: (a: K, e: T, i: number) => K, a?: K): K => {
    if (arr.length === 0 && a === undefined)
      throw new Error('Reduce of empty array with no initial value');

    const startIndex = a === undefined ? 1 : 0;
    let result = (a === undefined ? arr[0] : a) as K;
    for (let i = startIndex; i < arr.length; i++) {
      result = fn(result, arr[i], i);
    }
    return result;
  };

  {
    const data = [6, 7, 8];
    const result = reduce(data, (a, e, i) => a + e);
    console.log(data, result);
  }

  {
    const data = [6, 7, 8];
    const result = reduce(data, (a, e, i) => a + e, 1000);
    console.log(data, result);
  }
}
