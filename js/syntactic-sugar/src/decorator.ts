{
  // * ---------------- declaration

  function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
      console.log(`Calling ${name} with`, arguments);
      const result = oldValue.apply(this, arguments);
      console.log(`Result is ${result}`);
      return result;
    };

    return descriptor;
  }

  // * ---------------- usage

  class Tool {
    @log
    add(a, b) {
      console.log(this);
      return a + b;
    }
  }

  console.log(new Tool().add(1, 2));
}

// Calling add with [Arguments] { '0': 1, '1': 2 }
// Tool {}
// Result is 3
// 3

// * ------------------------------------------------ alternative

{
  // * ---------------- HOF

  const log = function(fn) {
    return function(...args) {
      console.log(`Calling ${fn.name} with`, arguments);
      const result = fn.apply(this, args);
      console.log(`Result is ${result}`);
      return result;
    };
  };

  // * ---------------- usage

  class Tool {
    add = log(function add(a, b) {
      console.log(this);
      return a + b;
    });
  }

  console.log(new Tool().add(1, 2));
}

// * ------------------------------------------------ composition

{
  // * ---------------- HOF

  const withLog = function(fn) {
    return function(...args) {
      console.log(`Calling ${fn.name} with`, arguments);
      const result = fn.apply(this, args);
      console.log(`Result is ${result}`);
      return result;
    };
  };

  // * ---------------- usage

  const add = (a, b) => a + b;

  const addWithLog = withLog(add);

  console.log(addWithLog(1, 2));
}
