// * 就不用 TS 了，别折腾自己
// * https://2ality.com/2014/01/new-operator.html

// * ------------------------------------------------ new

const myNew = (clsFn, ...args) => {
  const prototypedObj = Object.create(clsFn.prototype);
  const constructorResult = clsFn.call(prototypedObj, ...args);
  return typeof constructorResult === 'object' && constructorResult !== null
    ? constructorResult
    : prototypedObj;
};

// * ------------------------------------------------ usage

// * Class constructor MyClass cannot be invoked without 'new'
// * deal with it bitch!
// {
//   class MyClass {
//     constructor(val) {
//       this.val = val;
//     }
//     log() {
//       console.log('log', this.val);
//     }
//   }

//   const inst = myNew(MyClass, 233);

//   inst.log();
// }

// * --------------------------------

{
  function MyClass(val) {
    this.val = val;
  }

  MyClass.prototype.log = function () {
    console.log('log', this.val);
  };

  const inst = myNew(MyClass, 233);

  inst.log();
}
