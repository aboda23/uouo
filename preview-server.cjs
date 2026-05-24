const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, 'dist');
const preferredPort = Number(process.env.PORT || 5174);
const host = '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('The production build was not found. Run: npm.cmd run build');
  process.exit(1);
}

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(root, safePath);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(root, 'index.html');
    }

    const ext = path.extname(filePath);
    response.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
  });

function listen(port) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && port < preferredPort + 10) {
      listen(port + 1);
      return;
    }

    console.error(error.message);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log('');
    console.log('Yomna & Ahmed wedding invitation is running.');
    console.log(`Open: http://${host}:${port}`);
    console.log('');
    console.log('Keep this window open while viewing the website.');
  });
}

listen(preferredPort);
