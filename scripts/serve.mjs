import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
const root = resolve(process.argv[2] || 'public');
const port = Number(process.env.PORT || 4173);
const base = '/promo-cut-and-cuff';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === base) { res.writeHead(302, { Location: `${base}/` }); return res.end(); }
    if (pathname.startsWith(`${base}/`)) pathname = pathname.slice(base.length);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end('Forbidden'); }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}${base}/`));
