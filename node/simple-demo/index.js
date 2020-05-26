const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');

const asyncReadFile = promisify(readFile);

const srcFile = path.resolve(__dirname, 'text/hello.md');

(async () => {
  const txt = await asyncReadFile(srcFile, 'utf8');
  console.log('path is:', srcFile);
  console.log('context:', txt);
})();