// * try ramda https://ramdajs.com/docs/#uniqBy

// * ------------------------------------------------ uniqBy (key) simple

const uniqBy = <T, K extends any>(arr: T[], byKey: (ele: T) => K = (e) => e as any): T[] => {
  const map = new Set<K>();
  const result = arr.filter((e) => {
    const key = byKey(e);
    if (map.has(key)) {
      return false;
    } else {
      map.add(key);
      return true;
    }
  });

  return result;
};

// * ------------------------------------------------ usage

{
  const data = [
    { key: 1, val: 'Lorem' },
    { key: 2, val: 'ipsum' },
    { key: 3, val: 'dolor' },
    { key: 1, val: 'sit' },
    { key: 1, val: 'amet' },
    { key: 2, val: 'consectetur' },
    { key: 4, val: 'adipisicing' },
  ];

  const expected = [
    { key: 1, val: 'Lorem' },
    { key: 2, val: 'ipsum' },
    { key: 3, val: 'dolor' },
    { key: 4, val: 'adipisicing' },
  ];

  const result = uniqBy(data, (e) => e.key);

  console.log('--------');

  console.assert(JSON.stringify(result) === JSON.stringify(expected));

  console.log(result);

  console.log('--------');
}
