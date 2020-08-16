// * https://handlebarsjs.com/guide/#what-is-handlebars

// * ------------------------------------------------ template

const template = <T extends Record<any, any>>(str: string, data: T = {} as Record<any, any>) =>
  str.replace(/{{(.+?)}}/g, (e, slot) => (slot in data ? data[slot] : ''));

// * ------------------------------------------------ usage

console.log('--------');

{
  const result = template(`Hello {{name}}`, { name: 'LC' });
  console.log(result);
  console.assert(result === 'Hello LC');
}

console.log('--------');

{
  const result = template(`Hello {{name}}`);
  console.log(result);
  console.assert(result === 'Hello LC');
}

console.log('--------');
