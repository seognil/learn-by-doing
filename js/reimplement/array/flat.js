// * 先不 TS 了，有点麻烦……

// * ================================================================================ original

{
  const data = [1, [[2], [[3]]]];
  console.log(data.flat());
  console.log(data.flat(2));
  console.log(data.flat(Infinity));
}

console.log('--------');

// * ================================================================================ our

{
  const flat = (arr, depth = 1) => {
    if (!Array.isArray(arr)) return arr;
    if (depth <= 0) return [...arr];

    return arr.reduce((a, e) => [...a, ...(Array.isArray(e) ? flat(e, depth - 1) : [e])], []);
  };

  const data = [1, [[2], [[3]]]];
  console.log(flat(data));
  console.log(flat(data, 2));
  console.log(flat(data, Infinity));
}
