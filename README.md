# GlobalTire — Site (Mockup)

Static site (mockup) with dark theme inspired by https://chromium.themes.zone/tires/

Root working folder: `website/`

## Main Structure

- `index.html` — Main HTML (header, hero, catalog, services, footer)
- `css/style.css` — Dark theme styles
- `js/main.js` — Mobile menu and overlay controller
- `images/` — Images (placeholders and, once generated, optimized WebP/AVIF)
- `scripts/` — Utilities: download/optimization and variant generation

## How to Test Locally

Requirements (macOS): `python3` (for simple server). Optional: `brew`, `cwebp`, `magick` (ImageMagick), `avifenc`.

1. Start a local server from the `website` folder:

```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

2. Available scripts:

- `scripts/download_and_optimize_images.sh` — Downloads images from Unsplash and converts them to WebP (uses `cwebp`).
- `scripts/generate_variants.sh` — Generates variants (WebP/AVIF) from `*-original.jpg` files in `images/` using ImageMagick/cwebp/avifenc depending on availability.

Example:

```bash
# download and convert Unsplash -> webp
bash scripts/download_and_optimize_images.sh

# or, if you've placed originals in images/, generate variants
bash scripts/generate_variants.sh
```

## Image Specifications (for later replacement)

Below are the recommendations for formats, sizes, quality, and naming so that images are optimal and responsive.

Proposed naming convention

- Hero: `images/hero-1600.webp`, `images/hero-1200.webp`, `images/hero-900.webp`, `images/hero-600.webp`
- Products: `images/prod-1-800.webp`, `images/prod-1-400.webp`, `images/prod-1-200.webp` (and similar for prod-2, prod-3, prod-4)
- Originals (masters): `images/hero-original.jpg`, `images/prod-1-original.jpg`, etc. (save the masters in case you need to regenerate)
- Logos: `images/logo.svg` (preferable). If raster: `images/logo-256.png` and `images/logo-64.png`
- Favicons: `favicon-32.png`, `apple-touch-180.png`, `favicon.ico`

Recommendations by type

- Hero (main)
  - Aspect ratio: 16:9 or 3:2
  - Sizes (w descriptors): 1600w, 1200w, 900w, 600w
  - Formats: AVIF (best), WebP (wide), fallback SVG/PNG
  - Quality: WebP q=80, AVIF q~50-60
  - Suggested sizes attribute: `(min-width:1100px) 600px, (min-width:680px) 50vw, 100vw`

- Product (cards)
  - Aspect ratio: 4:3 or 16:9 (consistent)
  - Sizes: 800w, 400w, 200w
  - Formats: WebP, AVIF (optional)
  - Quality: WebP q=75-80, AVIF q=50
  - Suggested sizes: `(min-width:1100px) 25vw, (min-width:680px) 50vw, 100vw`

- Thumbnails / small
  - Sizes: 320w, 160w
  - Format: WebP q=70

- Logos and icons
  - Preferable: SVG (vector)
  - If raster: PNG and WebP at 256px and 64px

- Favicons
  - apple-touch-icon: 180x180 PNG
  - favicon PNG: 192x192, 32x32, 16x16
  - favicon.ico containing 16x16 and 32x32

Quick commands to generate variants (macOS)

- Using `cwebp` (install with `brew install webp`):

```bash
# convert and resize
cwebp -q 80 -resize 1600 0 images/hero-original.jpg -o images/hero-1600.webp
cwebp -q 80 -resize 1200 0 images/hero-original.jpg -o images/hero-1200.webp
cwebp -q 80 -resize 800 0 images/prod-1-original.jpg -o images/prod-1-800.webp
cwebp -q 80 -resize 400 0 images/prod-1-original.jpg -o images/prod-1-400.webp
```

- Using ImageMagick if it has webp/avif support (`magick`):

```bash
magick images/hero-original.jpg -resize 1600x -quality 85 images/hero-1600.webp
magick images/prod-1-original.jpg -resize 800x -quality 80 images/prod-1-800.webp
```

- Generate AVIF with `avifenc` (optional, install with `brew install libavif`):

```bash
magick images/hero-original.jpg -resize 1600x tmp-hero-1600.jpg
avifenc --min 30 --max 40 tmp-hero-1600.jpg images/hero-1600.avif
rm tmp-hero-1600.jpg
```

HTML usage examples (hero with avif/webp fallback and sizes)

```html
<picture>
  <source type="image/avif" srcset="images/hero-1600.avif 1600w, images/hero-1200.avif 1200w, images/hero-900.avif 900w, images/hero-600.avif 600w">
  <source type="image/webp" srcset="images/hero-1600.webp 1600w, images/hero-1200.webp 1200w, images/hero-900.webp 900w, images/hero-600.webp 600w">
  <img src="images/hero-900.webp" alt="Hero" loading="lazy" sizes="(min-width:1100px) 600px, (min-width:680px) 50vw, 100vw">
</picture>
```

Notes and best practices

- Keep the originals (masters) in `images/originals/` to regenerate with different parameters.
- Use names with hyphens and lowercase. Avoid spaces.
- Version assets by changing names or using hash in production for cache busting.
- Add `loading="lazy"` for non-critical images.

---

If you want, I can:

- Create and save the originals in `images/` if you give me the URLs (I can't download from this environment), or
- Automatically generate the complete `<picture>` tags in `index.html` after you run `scripts/generate_variants.sh` and confirm the files exist.

Tell me which you prefer and I'll continue.