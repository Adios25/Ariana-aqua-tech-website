# Ariana Aqua Tech Website

Static, dependency-free website for Ariana Aqua Tech.

## Files

- `index.html` - semantic one-page website.
- `styles.css` - responsive brand styling using blue, white, and minimal black.
- `script.js` - mobile navigation, product filters, reveal effects, CTA tracking hooks, and form status.
- `assets/` - supplied brand assets and manufacturer product images.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` - discovery files.

## Preview

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- The hero is static and does not use rolling slides.
- Product images were sourced from Daikin India, Virtec, Panda Metering, and ISOIL Industria product pages for product reference.
- Compressed JPEG copies are used for the heaviest above-the-fold product images; the original PNG files are kept as source assets.
- The contact form posts to FormSubmit for `suneel@arianaaquatech.com`; confirm the email once after deployment if FormSubmit asks for verification.
- Update the canonical domain in `index.html`, `robots.txt`, and `sitemap.xml` if the final domain is different from `arianaaquatech.com`.

## Maintenance Cadence

- Monthly: review Search Console queries and refresh service/location copy for terms such as Daikin cold rooms in Raigad, deep freezers in Thane, BTU meters for buildings, and HVAC flow meters.
- Monthly: test phone, email, quote CTA, product CTA, and FormSubmit paths.
- Quarterly: review lead quality and tune the offer, form fields, and hero copy around the best-fit projects.
- Quarterly: run Lighthouse or PageSpeed checks, compress any new assets, and update `sitemap.xml` `lastmod` after meaningful content changes.
- Ongoing: connect the `dataLayer` events in `script.js` to the deployed analytics tool for quote clicks, phone taps, email taps, product-selection clicks, and form submits.
