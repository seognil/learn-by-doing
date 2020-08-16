// * ------------------------------------------------ deepClone simple

const deepClone = <T = any>(data: T): T => {
  if (Array.isArray(data)) {
    // @ts-ignore Just Works Programming LOL
    return data.map((e) => deepClone(e)) as T;
  } else if (typeof data === 'object') {
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, deepClone(v)])) as T;
  } else {
    return data;
  }
};

// * ------------------------------------------------ usage

{
  const data = { children: [{ id: 2 }, { id: 3 }, { id: 4 }] };
  const result = deepClone(data);

  console.log(result);

  console.assert(result !== data);
  console.assert(result.children !== data.children);
  console.assert(JSON.stringify(result) === JSON.stringify(data));
}

{
  const data = [{ id: 2 }, { id: 3 }, { id: 4 }];
  const result = deepClone(data);
  console.log(result);
}
