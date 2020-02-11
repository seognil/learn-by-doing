// * ------------------------------------------------ async await

{
  const timeout = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

  const print = async () => {
    await timeout(100);
    console.log('Async Hello');
    await timeout(200);
    console.log('Async Again');
  };

  print();
}

// * ------------------------------------------------ Promise

{
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const print = () => {
    timeout(100)
      .then(() => {
        console.log('Promise Hello');
      })
      .then(() => timeout(200))
      .then(() => {
        console.log('Promise Again');
      });
  };

  print();
}

// * ------------------------------------------------ Callback

{
  const timeout = (ms, callback) => setTimeout(callback, ms);

  const print = () => {
    timeout(100, () => {
      console.log('Callback Hello');
      timeout(200, () => {
        console.log('Callback Again');
      });
    });
  };

  print();
}
