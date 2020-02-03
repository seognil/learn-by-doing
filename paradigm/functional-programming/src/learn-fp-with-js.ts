// https://www.youtube.com/watch?v=e-5obm1G_FY

// * ------------------------------------------------ FP vs IP

// * ---------------- IP
{
  const me = 'LC';
  const greeting = `Hi, I'm `;
  const result = greeting + me;

  console.log(result); // => 'Hi, I'm LC'
}

// * ---------------- FP
{
  const greet = (name) => `Hi, I'm ` + name;
  const result = greet('LC');

  console.log(result); // => 'Hi, I'm LC'
}

// * ------------------------------------------------ Side Effect

// * ---------------- impure
{
  const me = 'LC';
  const greet = () => `Hi, I'm ` + me;
}

// * ---------------- pure
{
  const greet = (name) => `Hi, I'm ` + name;
}

// * ------------------------------------------------ Higher Order Function

// * ---------------- HOC in ES5
{
  function makeAdjectifier(adjectifier) {
    return function(str) {
      return adjectifier + ' ' + str;
    };
  }
  var coolifier = makeAdjectifier('cool');
  var result = coolifier('conference');

  console.log(result); // => 'cool conference'
}

// * ---------------- HOC in ES6
{
  const makeAdjectifier = (adjectifier) => (str) => adjectifier + ' ' + str;

  const coolifier = makeAdjectifier('cool');
  const result = coolifier('conference');

  console.log(result); // => 'cool conference'
}

// * ------------------------------------------------ Map Reduce Filter

// * ------------------------------------------------ Immutable

// * ---------------- Mutation
{
  const rooms = ['H1', 'H2', 'H3'];
  rooms[2] = 'H4';

  rooms; // => ['H1', 'H2', 'H4'];
}

// * ---------------- No Mutation
{
  const rooms = ['H1', 'H2', 'H3'];
  const newRooms = rooms.map((e, i) => (i === 2 ? 'H4' : e));

  rooms; // => ['H1', 'H2', 'H3'];
  newRooms; // => ['H1', 'H2', 'H4'];
}

// * ---------------- Persistent Data
// https://github.com/swannodette/mori
// http://immutable-js.github.io/
