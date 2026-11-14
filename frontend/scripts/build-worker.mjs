import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const dist = join(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const files = {};
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await collect(full);
    else files['/' + relative(dist, full).replaceAll('\\', '/')] = {
      type: types[extname(full)] || 'application/octet-stream',
      data: (await readFile(full)).toString('base64'),
    };
  }
}
await collect(dist);
const source = await readFile(join(root, 'worker/index.js'), 'utf8');
await mkdir(join(dist, 'server'), { recursive: true });
await writeFile(join(dist, 'server/index.js'), source.replace('__STATIC_ASSETS__', JSON.stringify(files)));
