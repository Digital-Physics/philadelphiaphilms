# Philadelphia Philms (AI porting instructions)

A small static site for philadelphiaphilms.com — a single-page gallery of films,
videos, code, and design work. Built with Vite and React, no backend, deployed to
Cloudflare Pages.

## Run it locally

```bash
npm install
npm run dev
```

Vite serves it at `http://localhost:5173`.

## What's here

One page at `/`: a 23-item gallery, filterable by category (animation, film &
video, video games, commercials, code, design). Each tile links straight out to
the work — Vimeo, YouTube, itch.io, GitHub, or the live site. The contact email
is in the footer. Any unknown URL falls through to a simple 404.

```
index.html            # entry point
src/
  main.jsx            # mounts React
  App.jsx             # routes: "/" and a catch-all 404
  pages/
    Portfolio.jsx     # the gallery (the whole site, really)
    NotFound.jsx
  components/         # Masthead, Footer, Frame (one gallery tile)
  data/
    works.js          # the 23 items + categories  <- edit content here
    site.js           # name, tagline, contact email
  index.css           # all styling + design tokens
public/
  img/                # the 23 thumbnails (committed, served locally)
  favicon.*           # favicons
  _redirects          # SPA fallback for Cloudflare
```

## Editing content

Everything lives in `src/data/works.js`. Each item looks like:

```js
{
  id: 'yellowstone',
  title: 'Yellowstone',
  blurb: 'Super 8mm, Kodak 50D & 200T.',
  medium: 'film & video',   // sets which filter it appears under
  image: 'yellowstone.jpeg', // filename in public/img/
  href: 'https://vimeo.com/1020379427',
}
```

To add a category, just use a new `medium` value and add it to the `MEDIA` array
at the top of the file. To change a thumbnail, drop a new file in `public/img/`
and point `image` at its filename. Site name, tagline, and the footer email are
in `src/data/site.js`.

## Images

The thumbnails are self-hosted in `public/img/`, named to match each item's `id`
(e.g. `pymeister.png`, `yellowstone.jpeg`). Nothing depends on Squarespace's CDN.

## Favicon

Made from the Philadelphia Philms wordmark, squeezed to a square so the whole
wordmark stays in frame (the lettering runs edge to edge, so a crop would clip the
**P** and **S**). It ships as `favicon.ico` (16/32/48), `favicon-32.png`, and a
180×180 `apple-touch-icon.png`, all in `public/` and wired up in `index.html`.

To regenerate from a source image:

```python
from PIL import Image, ImageFilter
im = Image.open('favicon.webp').convert('RGB')
def make(size):
    c = im.resize((size, size), Image.LANCZOS)
    return c.filter(ImageFilter.UnsharpMask(0.5, 80, 0)) if size <= 48 else c
make(32).save('public/favicon-32.png')
make(180).save('public/apple-touch-icon.png')
for n in (16, 32, 48): make(n).save(f'/tmp/i{n}.png')
# then: convert /tmp/i16.png /tmp/i32.png /tmp/i48.png public/favicon.ico
```

## Deploy (Cloudflare Pages via GitHub)

Push the repo to GitHub, then in the Cloudflare dashboard go to **Workers &
Pages → Create application → Pages → Import an existing Git repository**, pick the
repo, and set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

Save and deploy. You'll get a `*.pages.dev` URL, and every push to the main branch
rebuilds and redeploys automatically.

`public/_redirects` (`/* /index.html 200`) is copied into `dist/` at build time
and tells Cloudflare to serve `index.html` for every route, so client-side routing
and hard refreshes work.

To use the real domain, add `philadelphiaphilms.com` under the project's **Custom
domains** tab and move the domain's DNS to Cloudflare. Keep the Squarespace site
live until DNS propagates so there's no downtime.

(There's also a `deploy` script using Wrangler for command-line deploys, but with
the GitHub integration above you don't need it.)

## Design notes

The palette comes from colour negative film — pale film-base green, process
magenta, a cool near-black. Type is Archivo for display and Space Mono for labels.
The gallery is laid out like a contact sheet with sprocket-hole rails down the
sides, and each tile carries its category tag, which doubles as the filter. All
styling is in `src/index.css`.

##