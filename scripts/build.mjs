import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const target = resolve(root, 'dist');
// This is the single fixed, generated output folder; never a caller-supplied path.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(resolve(root, 'public'), target, { recursive: true });
console.log(`Built ${(await readdir(target)).length} entries into dist/. No dependencies or secrets required.`);
