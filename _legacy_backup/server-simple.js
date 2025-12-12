const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const SUBMISSIONS = path.join(__dirname, 'submissions.json');

function ensureSubmissionsFile() {
  if (!fs.existsSync(SUBMISSIONS)) fs.writeFileSync(SUBMISSIONS, '[]', 'utf8');
}

function saveSubmission(obj) {
  ensureSubmissionsFile();
  const raw = fs.readFileSync(SUBMISSIONS, 'utf8') || '[]';
  let arr = [];
  try { arr = JSON.parse(raw); } catch(e) { arr = []; }
  arr.push(obj);
  fs.writeFileSync(SUBMISSIONS, JSON.stringify(arr, null, 2), 'utf8');
}

function serveFile(filePath, req, res) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 404`);
      return;
    }

    if (stats.isDirectory()) {
      const index = path.join(filePath, 'index.html');
      if (fs.existsSync(index)) filePath = index;
      else {
        res.statusCode = 403;
        res.end('Forbidden');
        console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 403`);
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', type);

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      res.statusCode = 500;
      res.end('Server error');
      console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 500`);
    });
    stream.pipe(res);
    console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 200 ${type}`);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Handle form submission endpoint
  if (req.method === 'POST' && urlPath === '/form-submit') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      // parse application/x-www-form-urlencoded
      const parsed = {};
      body.split('&').forEach(pair => {
        if (!pair) return;
        const parts = pair.split('=');
        const key = decodeURIComponent(parts[0] || '');
        const val = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
        parsed[key] = val;
      });

      const entry = {
        receivedAt: new Date().toISOString(),
        ip: req.socket.remoteAddress,
        data: parsed
      };
      try {
        saveSubmission(entry);
        // redirect back to homepage with thanks fragment
        res.statusCode = 303;
        res.setHeader('Location', '/#contact?sent=1');
        res.end();
        console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 201 form saved`);
      } catch (e) {
        res.statusCode = 500;
        res.end('Unable to save submission');
        console.error('Error saving submission', e);
      }
    });
    return;
  }

  // Simple submissions listing (not protected) - shows stored messages
  if (req.method === 'GET' && urlPath === '/submissions') {
    ensureSubmissionsFile();
    const raw = fs.readFileSync(SUBMISSIONS, 'utf8') || '[]';
    res.setHeader('Content-Type', 'application/json');
    res.end(raw);
    console.log(`${new Date().toISOString()}  "${req.method} ${req.url}" 200 submissions`);
    return;
  }

  // serve static files
  let filePath = path.join(__dirname, urlPath);
  if (urlPath === '/' || urlPath === '') filePath = path.join(__dirname, 'index.html');
  serveFile(filePath, req, res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static server running at http://127.0.0.1:${port} (root: ${__dirname})`);
});

process.on('SIGINT', () => process.exit(0));
