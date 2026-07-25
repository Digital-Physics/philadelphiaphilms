# Philadelphia Philms

A static React port of the Squarespace site at philadelphiaphilms.com. Vite + React
Router, no backend, deploys to Cloudflare Pages.

## Run it

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

Easiest path is the Git integration: push this repo, then in the Cloudflare
dashboard create a Pages project with **build command** `npm run build` and
**output directory** `dist`. Every push deploys.

Or from the terminal:

```bash
npx wrangler login
npm run deploy          # build + wrangler pages deploy dist
```

`public/_redirects` contains the SPA fallback (`/* /index.html 200`) so that
`/about`, `/contact`, and `/video-game` resolve on a hard refresh. Without it
those URLs 404 — Cloudflare serves static files and doesn't know about the
client-side router.

When you're ready to cut over, add `philadelphiaphilms.com` as a custom domain
on the Pages project and point the nameservers at Cloudflare. Keep the
Squarespace site up until the DNS has propagated.

## What's here

| Page | Route |
| --- | --- |
| Portfolio (23 works, filterable by medium) | `/` |
| Video game | `/video-game` |
| About | `/about` |
| Contact | `/contact` |

All content lives in two files:

- `src/data/works.js` — the 23 portfolio items
- `src/data/site.js` — about copy, contact details, nav

## Two things to finish

### 1. Filling in the missing links

Seven items have real URLs already. The rest — the music videos and film pieces —
have `href: ''` with a `// TODO` next to them, because Squarespace renders those
clickthrough links in JavaScript and they aren't in the served HTML.

Fastest way to get them, while the Squarespace site is still up:

```bash
npm run import
```

That hits `https://www.philadelphiaphilms.com/?format=json` and prints each
gallery item's title alongside its `clickthroughUrl`. Paste the URLs into
`works.js`.

If that endpoint is disabled, open the live site in a browser and paste this into
the dev-tools console:

```js
copy(
  [...document.querySelectorAll('.gallery-item, .slide, [data-slide-url]')]
    .map((el) => {
      const img = el.querySelector('img');
      const a = el.querySelector('a[href]');
      return { title: img?.alt || '', href: a?.href || el.dataset.slideUrl || '' };
    })
    .filter((r) => r.title)
);
```

It copies a JSON array of `{ title, href }` to your clipboard.

Items with an empty `href` still render — they're just dimmed and not clickable —
so the site works fine before you finish this.

### 2. Getting off the Squarespace CDN

The thumbnails currently load from `images.squarespace-cdn.com`. Those URLs will
die when you cancel the account.

```bash
npm run images
```

downloads all 23 into `public/img`. Then set `SELF_HOSTED_IMAGES = true` at the
bottom of `src/data/works.js` and they'll be served from your own origin.

## Favicon

The site ships with a favicon designed to match the rest of the page: a "PP"
monogram in process magenta on the film-base green, framed with sprocket holes.
It lives in `public/` as four files, all wired up in `index.html`:

- `favicon.svg` — used by modern browsers, sharp at any size
- `favicon.ico` — multi-size (16/32/48) fallback for older browsers
- `favicon-32.png` — PNG fallback
- `apple-touch-icon.png` — 180×180 for iOS home-screen bookmarks

### Using your original Squarespace favicon instead

Your old favicon is still on the live site. To grab it:

1. Open philadelphiaphilms.com and view the page source (`view-source:` in the
   address bar, or right-click → View Page Source). Search the `<head>` for
   `icon` — you'll find a `<link rel="shortcut icon" href="https://images.squarespace-cdn.com/...">`.
   Open that URL and save the image.
2. Or, in Squarespace: **Design → Logo & Title** (older layouts:
   **Website Tools → Browser Icon / Favicon**) has the uploaded icon with a
   download option. This gives you the original source file.

Then either drop your file into `public/` and update the `<link>` tags in
`index.html` to point at it, or — simplest — regenerate the set from your image:

```bash
# from a single square PNG (512×512 is ideal)
npx sharp-cli resize 32 32 --input your-icon.png --output public/favicon-32.png
npx sharp-cli resize 180 180 --input your-icon.png --output public/apple-touch-icon.png
```

For the `.ico`, any online "PNG to ICO" converter works, or ImageMagick:
`convert your-icon.png -define icon:auto-resize=48,32,16 public/favicon.ico`.
If you go with a raster original, delete the `favicon.svg` link line from
`index.html` so browsers don't prefer the old vector mark over your image.

## Design notes

The palette is taken from colour negative film — pale film-base green, process
magenta, and a cool near-black for the rebate edge. Type is Archivo (display) and
Space Mono (labels and metadata). The portfolio grid is laid out as a contact
sheet with sprocket-hole rails down either side, which is why the medium tag
(`film` / `video` / `web` / `game`) sits on every frame: given how much of the
work is actually shot on Super 8 and 16mm, the gauge is information, not
decoration.

Nothing about the visual direction is load-bearing. If you want the old
Squarespace look back, `src/index.css` is the only file to touch.