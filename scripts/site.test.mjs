import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Script } from 'node:vm';
const root = resolve(import.meta.dirname, '..', 'public');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
test('all local assets exist and work under a GitHub Pages project path', async () => {
  for (const [, ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:)/.test(ref)) continue;
    assert.ok(ref.startsWith('./'), `Use a relative project-path-safe URL: ${ref}`);
    await access(resolve(root, ref));
  }
  const css = await readFile(resolve(root, 'styles.css'), 'utf8');
  for (const [, ref] of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) await access(resolve(root, ref));
});
test('all internal section links resolve to unique IDs', () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), `Missing anchor: ${anchor}`);
});
test('scripts parse and all style preview assets exist', async () => {
  new Script(await readFile(resolve(root, 'app.js'), 'utf8'));
  for (const [, inlineScript] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new Script(inlineScript);
  for (const key of ['everyday', 'tailored', 'off-duty', 'after-hours']) await access(resolve(root, `assets/look-${key}.jpg`));
});
test('social preview is local, present, and published at the expected URL', async () => {
  assert.ok(html.includes('https://lamezati-sudo.github.io/promo-cut-and-cuff/assets/social-card.jpg'));
  await access(resolve(root, 'assets/social-card.jpg'));
});
test('all editorial images have descriptions or are explicitly decorative', () => {
  for (const [tag] of html.matchAll(/<img\b[^>]+>/g)) assert.match(tag, /\balt="[^"]*"/, `Image missing alt: ${tag}`);
});
