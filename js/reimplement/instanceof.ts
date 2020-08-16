// * ================================================================================ original
{
  class A {}
  class B extends A {}
  class C extends B {}
  class D extends B {}
  class E extends A {}

  /*
    A <-  B <- C
          B <- D
    A <-  E
  */

  // * ----------------

  const inst = new C();

  console.warn([
    inst instanceof Object,
    inst instanceof A,
    inst instanceof B,
    inst instanceof C,
    inst instanceof D,
    inst instanceof E,
  ]);
}
console.log('--------');

// * ================================================================================ our

// * 只要理解了 ES 的继承中，继承类的 prototype 是基类的实例

{
  const instanceOf = (proto: any, inst: any) => {
    let p = inst;
    const p0 = proto.prototype;

    if (p0 === undefined) throw TypeError(`instanceof ${proto} is not callable`);

    while (p !== null) {
      if (p === p0) return true;
      p = Object.getPrototypeOf(p);
    }
    return false;
  };

  // * ----------------

  class A {}
  class B extends A {}
  class C extends B {}
  class D extends B {}
  class E extends A {}

  /*
    A <-  B <- C
          B <- D
    A <-  E
  */

  // * ----------------

  const inst = new C();

  console.warn([
    instanceOf(Object, inst),
    instanceOf(A, inst),
    instanceOf(B, inst),
    instanceOf(C, inst),
    instanceOf(D, inst),
    instanceOf(E, inst),
  ]);
}
