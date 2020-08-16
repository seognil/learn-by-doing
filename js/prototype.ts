// * 只要理解了 ES 的继承中：
// * 继承类的 prototype 是基类的实例
// * 实例没有 prototype
// * 实例的 __proto__ 是类的 prototype

class Base {}

class Ext extends Base {}

const inst = new Ext();

console.log([
  // @ts-ignore
  inst.__proto__ === Object.getPrototypeOf(inst),
  // @ts-ignore
  inst.prototype === undefined,

  Object.getPrototypeOf(inst) === Ext.prototype,
]);

console.log([
  //
  Object.getPrototypeOf(Ext.prototype) === Base.prototype,
]);

console.log([
  Base.prototype.constructor === Base,
  Ext.prototype.constructor === Ext,
  Object.prototype.constructor === Object,
  Function.prototype.constructor === Function,
]);

console.log([
  // * 一等公民 一等公民

  Object.getPrototypeOf(Object) === Function.prototype,

  Object.getPrototypeOf(Function) === Function.prototype,

  Object.getPrototypeOf(Function.prototype) === Object.prototype,
]);
