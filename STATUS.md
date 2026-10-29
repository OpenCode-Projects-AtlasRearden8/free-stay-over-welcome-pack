# STATUS.md — free stay-over welcome pack

Date: 2026-10-29
Maintained by Asdale Dynamics, LLC

## What was built

A complete, self-contained printable pack for hosting house guests kindly:

1. **Bedside welcome card** — a two-sided fold card for the nightstand with
   a good-night checklist, write-in blanks, and a host-name line.
2. **Wi-Fi & house rules** — network name, a large write-in password box, and
   six short "quiet and kind" rules with blanks for quiet hours, shoes, keys.
3. **Towels & quiet-hours note** — named spots for towels, blankets, earplugs,
   dryer, chargers, hamper, trash; quiet-time blanks in the middle.
4. **Help-yourself kitchen labels** — eight cut-out permission labels
   (coffee, snacks, dishes, trash day, thanks).
5. **Pet confirmation card** — pet name/type, potty spot, poop-bag location,
   furniture rules, resident-pet intro, treat rules, backup contact + vet.
6. **Neighborhood eats shortlist** — a six-row fill-in table (place / good for /
   walk time / what to order) plus an "always vouch for" box.
7. **To-go gift-bag card** — what's in the door tote, one rule ("take two"),
   bag location, and a short host-note blank.
8. **Host restock checklist** — after-every-stay and before-guests-arrive
   checklists plus a shopping list, all checkbox-ready.

Supporting everything:

- **One build script** (`build.mjs`): renders each HTML source to an unbranded
  PDF in `printables/` with headless Chrome (`--print-to-pdf`), validates each
  PDF, and generates a warm per-sheet usage page plus an index in `usage/`.
- **Shared print stylesheet** (`sheets/css/pack.css`): US Letter `@page`,
  write-in dotted blanks, checkboxes, cut-out label borders, fold-card layout.
- **Zero npm dependencies**; only Node 18+ and a local Chrome/Chromium binary.

## How to run it

```sh
npm run build   # node build.mjs — builds all 8 PDFs + usage pages
npm test        # builds from scratch, then verifies everything
```

Open `usage/index.html` in a browser for warm, step-by-step instructions per
sheet. Print `printables/*.pdf` on plain Letter paper.

## Verification results

- `npm run build` → **8/8 PDFs built and validated** (each exactly 1 Letter
  page: header `%PDF-`, `%%EOF` trailer, page objects present, sane size).
- `npm test` → **35/35 passing** (4 suites):
  - build runs cleanly from scratch,
  - every configured sheet produces a valid PDF (per-sheet tests),
  - the PDF set matches the config exactly (no missing/extra files),
  - a warm usage page exists per sheet and the index lists all 8,
  - every HTML source is printable and **unbranded** (no brand name, no links).
- All 8 sheets visually inspected as rendered images: one page each, warm but
  ink-friendly design, no overflow, no clipped lines.

## Known gaps

- PDF rendering depends on a locally installed Chrome/Chromium; the build
  explains itself and exits with a clear message if none is present. A
  WeasyPrint fallback could remove that dependency later.
- Sheets are US Letter only; A4 prints fine but margins are tuned for Letter.
- No dark-mode or two-page variants; each sheet is deliberately one page.
- Usage pages target the browser reading flow; they're generated, so any copy
  edits happen in `sheets/config.mjs`, not the generated HTML.

## Notes

- No secrets, keys, or personal data anywhere in the repo (checked by test
  assertions on the sheet sources; nothing collects or phones home).
- License: MIT, `Copyright (c) 2026 Asdale Dynamics, LLC` (see `LICENSE`);
  README credits Asdale Dynamics, LLC.
- The `printables/` and `usage/` folders are generated but committed, so
  non-technical users can download and print without running anything.
