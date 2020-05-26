const path = require('path');
const fs = require('fs');
const http = require('http');

// * ----------------

const htmlFolder = path.resolve(__dirname, '../public');
const notFoundPath = path.resolve(htmlFolder, '404.html');

const getFilePath = (url) => {
  const ext = path.extname(url);
  const missingExt = ext ? '' : '.html';
  const validUrl = url === '/' ? '/index' : url;
  const filePath = htmlFolder + validUrl + missingExt;

  return filePath;
};

const contentTypeMap = {
  '.css': 'text/css',
  '.html': 'text/html',
};

const getContentTypeHeader = (filePath) => ({
  'Content-Type': contentTypeMap[path.extname(filePath)] || '',
});

http
  .createServer(async (req, res) => {
    const filePath = getFilePath(req.url);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile(notFoundPath, (err, content) => {
            res.writeHead(200, getContentTypeHeader(notFoundPath));
            res.end(content, 'utf8');
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, getContentTypeHeader(filePath));
        res.end(content, 'utf8');
      }
    });
  })
  .listen(8100, () => {
    console.log('http://localhost:8100/');
  });
