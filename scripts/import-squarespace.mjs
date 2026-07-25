#!/usr/bin/env node
/**
 * Pulls the gallery JSON straight off the live Squarespace site and prints the
 * clickthrough URL for every item, keyed by title. Copy the results into the
 * `href` fields in src/data/works.js.
 *
 *   npm run import
 *
 * Squarespace exposes any page as JSON by appending ?format=json. If the site
 * has already been unpublished, use the browser-console fallback in the README.
 */

const PAGE = process.argv[2] || 'https://www.philadelphiaphilms.com/?format=json';

const res = await fetch(PAGE, {
  headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-migration)' },
});

if (!res.ok) {
  console.error(`Request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const data = await res.json();

// Gallery items live either at the collection root or inside a gallery block.
const items = data.items ?? data.collection?.items ?? [];

if (!items.length) {
  console.error('No items found. Dumping top-level keys so you can dig in:');
  console.error(Object.keys(data).join(', '));
  process.exit(1);
}

const rows = items.map((item) => ({
  title: item.title ?? '',
  href: item.clickthroughUrl ?? item.sourceUrl ?? item.fullUrl ?? '',
  image: item.assetUrl ?? '',
  caption: (item.body ?? '').replace(/<[^>]+>/g, '').trim(),
}));

console.log(JSON.stringify(rows, null, 2));
console.error(`\n${rows.length} items. Paste the href values into src/data/works.js.`);
