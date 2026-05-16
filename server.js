const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const rootDir = process.cwd();

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function sanitizeUrl(url) {
  const parsedPath = new URL(url, `http://localhost:${port}`).pathname;
  return path.normalize(parsedPath).replace(/^\.+/, '');
}

function sendResponse(response, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Internal Server Error');
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  const safePath = sanitizeUrl(request.url);
  let filePath = path.join(rootDir, safePath);

  if (filePath.endsWith(path.sep)) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      sendResponse(response, filePath);
      return;
    }

    const fallbackPath = path.join(rootDir, 'index.html');
    fs.access(fallbackPath, fs.constants.R_OK, (fallbackErr) => {
      if (!fallbackErr) {
        sendResponse(response, fallbackPath);
      } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
});
