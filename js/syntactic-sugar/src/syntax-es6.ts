// * ------------------------------------------------ for of

{
  const arr = [1, 2, 3];

  for (const val of arr) {
    console.log(val);
  }
}

// * ---------------- for in

{
  const arr = [1, 2, 3];

  for (const key in arr) {
    const val = arr[key];
    console.log(val);
  }
}

// * ------------------------------------------------ string

{
  const language = 'JavaScript';

  const str6 = `Hello ${language}`;
  console.log(str6);
}

// * ---------------- in ES5

{
  var language = 'JavaScript';

  var str5 = 'Hello' + ' ' + language;
  console.log(str5);
}

// * ------------------------------------------------ array function

{
  const arrFn = (a) => a + 1;
  console.log(arrFn(6));
}

// * ---------------- in ES5

{
  function fnFn(a) {
    return a + 1;
  }
  console.log(fnFn(6));
}

// * ------------------------------------------------ class

{
  class Class6 {
    val;
    constructor(val) {
      this.val = val;
    }
    log() {
      console.log(this.val);
    }
  }
  new Class6('hello').log();
}

// * ---------------- in ES5

{
  function Class5(val) {
    this.val = val;
  }
  Class5.prototype.log = function() {
    console.log(this.val);
  };

  new Class5('hello').log();
}

// * ------------------------------------------------ destructing

{
  const arr = [1, 2];
  const [a, b] = arr;

  const obj = { c: 3, d: 4, e: 5 };
  const { c, ...d } = obj;

  const arr2 = [6, 7, 8];
  const [e, ...f] = arr2;

  console.log(a, b, c, d, e, f);
}

// * ---------------- in ES5

{
  var arr = [1, 2];
  var a = arr[0];
  var b = arr[1];

  var obj = { c: 3, d: 4, e: 5 };
  var c = obj.c;

  var d = {};
  for (var k in obj) {
    if (k !== 'c') d[k] = obj[k];
  }

  var arr2 = [6, 7, 8];
  var e = arr2[0];
  var f = arr2.slice(1);

  console.log(a, b, c, d, e, f);
}
