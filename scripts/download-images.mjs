#!/usr/bin/env node
/**
 * Downloads every portfolio thumbnail off the Squarespace CDN into public/img
 * so the site stops depending on Squarespace once you cancel the subscription.
 *
 *   npm run images
 *
 * Then set SELF_HOSTED_IMAGES = true in src/data/works.js.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { works } from '../src/data/works.js';

const CDN = 'https://images.squarespace-cdn.com/content/v1/5b47eb1db40b9dcad81b6784';
const OUT = path.resolve('public/img');

await mkdir(OUT, { recursive: true });

let ok = 0;
for (const work of works) {
  const ext = work.image.slice(work.image.lastIndexOf('.'));
  const url = `${CDN}/${work.image}?format=1500w`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(OUT, work.id + ext), buf);
    console.log(`saved  ${work.id}${ext}  (${Math.round(buf.length / 1024)} KB)`);
    ok += 1;
  } catch (err) {
    console.error(`failed ${work.id}: ${err.message}`);
  }
}

console.log(`\n${ok}/${works.length} downloaded to public/img.`);
console.log('Now set SELF_HOSTED_IMAGES = true in src/data/works.js.');
