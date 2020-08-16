// * ================================================================================ class

{
  class MyBase {
    constructor(val) {
      this.val = val;
      console.log('base_init', val, this.val);
    }
    log() {
      console.log('base_val', this.val);
    }
    solid() {
      console.log('solid_val', this.val);
    }
  }

  class MyExt extends MyBase {
    constructor(val) {
      super(val);
      this.val = 'ext' + val;
      console.log('init', val, this.val);
    }
    log() {
      console.log('ext_val', this.val);
    }
  }

  // * ----------------

  const inst = new MyExt(233);
  inst.log();
  inst.solid();

  // * ----------------

  console.log([
    MyExt.prototype === inst.__proto__,
    MyExt.prototype === Object.getPrototypeOf(inst),
    MyExt.prototype.constructor === MyExt,
    MyExt.prototype.__proto__ === MyBase.prototype,
  ]);

  // * ----------------
}

console.log('--------');

// * ================================================================================ es5

{
  function MyBase(val) {
    this.val = val;
    console.log('base_init', val, this.val);
  }

  MyBase.prototype.log = function () {
    console.log('base_val', this.val);
  };
  MyBase.prototype.solid = function () {
    console.log('solid_val', this.val);
  };

  // * ----------------

  const es5extends = (subFn, superFn) => {
    // * 原型链寄生组合继承
    subFn.prototype = Object.create(superFn.prototype);
    subFn.prototype.constructor = subFn;
  };

  // * ----------------

  function MyExt(val) {
    // * 模拟 super
    MyBase.call(this, val);

    this.val = 'ext' + val;
    console.log('init', val, this.val);
  }

  es5extends(MyExt, MyBase);

  MyExt.prototype.log = function () {
    console.log('ext_val', this.val);
  };

  // * ----------------

  const inst = new MyExt(233);
  inst.log();
  inst.solid();

  // * ----------------

  console.log([
    MyExt.prototype === inst.__proto__,
    MyExt.prototype === Object.getPrototypeOf(inst),
    MyExt.prototype.constructor === MyExt,
    MyExt.prototype.__proto__ === MyBase.prototype,
  ]);
}
