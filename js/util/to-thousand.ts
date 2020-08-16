// * ------------------------------------------------ toThousand simple

const toThousand = (str: string | number) => String(str).replace(/\B(?=(\d{3})+\b)/g, ',');

// * ------------------------------------------------ usage

console.warn('lcdebug 617c7a', toThousand('123456789.12345'));
