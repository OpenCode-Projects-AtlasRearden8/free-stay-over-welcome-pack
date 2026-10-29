# The free stay-over welcome pack

Free printables for hosting guests kindly. Eight short, warm sheets you print at
home and fill in by hand — no accounts, no tracking, no signups. Everything
builds locally on your own computer with one script, and the tests verify that
every sheet produces a valid PDF.

Built and maintained by **Asdale Dynamics, LLC** — the AI-in-plain-English
project by Dylan Asdale ([dylanasdale.github.io](https://dylanasdale.github.io)).
We like tools that run on your machine, ask for nothing, and just work.

## What's inside (8 sheets)

| # | Sheet | What it's for |
|---|-------|---------------|
| 1 | Bedside welcome card | A two-sided folded card for the nightstand — the first thing your guest finds. |
| 2 | Wi-Fi & house rules | Network name, a big password box, and short, kind house rules with write-in blanks. |
| 3 | Towels & quiet-hours note | Where towels live, where blankets are, and when the house goes quiet. |
| 4 | Help-yourself kitchen labels | Eight cut-out labels that post permission where guests hesitate to ask. |
| 5 | Pet confirmation card | Potty spots, treat rules, and vet info when a pet is staying too. |
| 6 | Neighborhood eats shortlist | A fill-in table of your honest local picks, walk-time included. |
| 7 | To-go gift-bag card | A card for the filled tote by the door, so nobody leaves empty-handed. |
| 8 | Host restock checklist | The one sheet for you: ten minutes before arrivals, five after goodbyes. |

The finished, unbranded PDFs live in **`printables/`**.

## Quick start

```sh
npm run build   # renders all 8 sheets to printables/*.pdf + usage pages
npm test        # builds from scratch and verifies every PDF is valid
```

Requirements:

- **Node.js 18+** — runs the build script and tests (no npm packages needed).
- **Chrome or Chromium** — used headlessly to print HTML to PDF.
  macOS/Windows: Chrome works as-is. If the script can't find it, point it there:
  `CHROME_BIN=/path/to/chrome npm run build`

No `npm install` is required — there are zero dependencies, so a fresh clone or
zip download builds offline.

## Using the printables

1. Open a PDF in `printables/` and print on plain US Letter paper (regular
   printer paper is fine; card stock is nicer for labels).
2. A warm, step-by-step guide for each sheet lives in `usage/` — open
   `usage/index.html` in a browser and click through to any sheet.
3. Fill the blanks in by hand. Handwriting is the point.

The sheets are US Letter (8.5×11 in), one page each, with no headers, footers,
or branding — they're ready to give to a guest as-is.

## Project layout

```
build.mjs              ← the one build script (renders PDFs + usage pages)
sheets/html/           ← HTML/CSS sources, one file per sheet
sheets/css/pack.css    ← shared warm print stylesheet (Letter, no chrome-link)
sheets/config.mjs      ← sheet list + the copy for each usage page
lib/pdf-utils.mjs      ← dependency-free PDF validity checks
printables/            ← built, unbranded PDFs (the deliverable)
usage/                 ← generated "how to use this sheet" pages (per sheet)
test/build.test.mjs    ← runs a fresh build and verifies every sheet
```

## How PDFs are made

`build.mjs` opens each HTML sheet in headless Chrome with
`--print-to-pdf --no-pdf-header-footer`, validates the output (PDF header, EOF
trailer, page objects, sane size), and writes it to `printables/`. It then
generates the warm usage pages from the copy in `sheets/config.mjs`. If any
sheet fails to render or validate, the build exits non-zero.

## Privacy & principles

- **Local-first.** The build and tests touch nothing but your own files.
- **Zero signups.** No accounts, no analytics, no emails, no phone-home.
- **Unbranded.** The guest-facing sheets carry no logos, links, or credits.
- **No secrets or personal data.** Nothing in this repo collects or stores any.

## Editing a sheet

Open the matching file in `sheets/html/`, tweak the copy, and run `npm run
build`. The shared colors, blanks, checkboxes, and cut-lines live in
`sheets/css/pack.css`. To add a whole new sheet, drop the HTML into
`sheets/html/` and add an entry to `SHEETS` in `sheets/config.mjs`; tests and
the usage index pick it up automatically.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Asdale Dynamics, LLC.

Print them, share them freely, and host someone warmly.
