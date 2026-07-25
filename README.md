# Philadelphia Philms

A small static portfolio site for philadelphiaphilms.com — a single-page gallery of films, videos, code, games, commercials, and design work.

Built with Vite and React. There is no backend, database, or external image CDN dependency.

## Run it locally

```bash
npm install
npm run dev
```

Vite serves the site at:

```text
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

The production files are written to `dist/`.

## Project structure

```text
index.html              # HTML entry point

src/
  main.jsx              # Mounts the React application
  App.jsx               # Routes "/" and the catch-all 404
  pages/
    Portfolio.jsx       # Main gallery
    NotFound.jsx        # 404 page
  components/           # Masthead, Footer, Frame, etc.
  data/
    works.js            # Portfolio items and categories
    site.js             # Site name, tagline, and contact email
  index.css             # All styling and design tokens

public/
  img/                  # Self-hosted portfolio thumbnails
  favicon.*             # Favicon files
```

## Editing the portfolio

The main portfolio content lives in:

```text
src/data/works.js
```

Each item looks like:

```js
{
  id: 'yellowstone',
  title: 'Yellowstone',
  blurb: 'Super 8mm, Kodak 50D & 200T.',
  medium: 'film & video',
  image: 'yellowstone.jpeg',
  href: 'https://vimeo.com/1020379427',
}
```

To add a new work:

1. Add an item to `src/data/works.js`.
2. Add its thumbnail to `public/img/`.
3. Set the item's `image` property to the thumbnail filename.
4. Use an existing category, or add a new category to the `MEDIA` array in `works.js`.

To change a thumbnail, replace the corresponding file in `public/img/` and keep the filename the same, or update the item's `image` property.

Site-wide metadata such as the site name, tagline, and contact email lives in:

```text
src/data/site.js
```

## Images

All portfolio thumbnails are self-hosted in:

```text
public/img/
```

They are committed to the repository and included in the production build. The site no longer depends on Squarespace or its CDN.

Thumbnails are named to match their portfolio item's `id` where practical, for example:

```text
pymeister.png
yellowstone.jpeg
```

## Favicon

The favicon files are generated from the Philadelphia Philms wordmark and live in `public/`.

The current set includes:

* `favicon.ico`
* `favicon-32.png`
* `apple-touch-icon.png`

The wordmark is squeezed into a square so the full lettering remains visible rather than cropping the first or last letter.

## Deployment

The site is a static Vite build. Deployment consists of:

1. Installing dependencies.
2. Running `npm run build`.
3. Publishing the resulting `dist/` directory.

The important build settings are:

```text
Build command: npm run build
Output directory: dist
```

The production site is deployed through Cloudflare. The repository's Git-connected deployment automatically rebuilds the site when changes are pushed to the production branch.

The project also includes a Wrangler deployment script for command-line deployments, but the normal workflow is to push changes to GitHub and let the connected deployment handle the build.

## Custom domain

The old custom domain site was:

https://philadelphiaphilms.com

The site is deployed to Cloudflare Pages and is also available at:

https://philadelphiaphilms.pages.dev

## Design

The visual language is inspired by colour-negative film:

* pale film-base green
* process magenta
* cool near-black

Archivo is used for display type and Space Mono for labels.

The gallery is laid out like a contact sheet, with sprocket-hole rails along the sides. Each tile includes a category tag, which also functions as a filter.

All styling lives in:

```text
src/index.css
```
