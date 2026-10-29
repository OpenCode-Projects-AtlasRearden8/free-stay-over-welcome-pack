#!/usr/bin/env node
// One build script for the stay-over welcome pack.
//
//   node build.mjs
//   npm run build
//
// What it does:
//   1. Renders every HTML sheet in sheets/html/ to an unbranded PDF in
//      printables/ using headless Chrome (no network, no accounts).
//   2. Generates a warm usage page per sheet in usage/, one index page and
//      one page per sheet, from the copy in sheets/config.mjs.
//   3. Validates each PDF before declaring success.
//
// Pick your Chrome with an env var: CHROME_BIN=/path/to/chrome node build.mjs
// Otherwise the script tries common binary names on PATH.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACK, SHEETS } from "./sheets/config.mjs";
import { validatePdf } from "./lib/pdf-utils.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const HTML_DIR = path.join(ROOT, "sheets", "html");
const PRINTABLES_DIR = path.join(ROOT, "printables");
const USAGE_DIR = path.join(ROOT, "usage");

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  "google-chrome",
  "google-chrome-stable",
  "chromium",
  "chromium-browser",
  "chrome",
].filter(Boolean);

function findChrome() {
  for (const bin of CHROME_CANDIDATES) {
    if (bin.includes("/")) {
      if (fs.existsSync(bin)) return bin;
      continue;
    }
    const probe = spawnSync("which", [bin], { encoding: "utf8" });
    if (probe.status === 0 && probe.stdout.trim()) return bin;
  }
  return null;
}

function renderPdf(chrome, htmlPath, outPath) {
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    `--print-to-pdf=${outPath}`,
    `file://${htmlPath}`,
  ];
  const result = spawnSync(chrome, args, {
    encoding: "utf8",
    timeout: 60_000,
    stdio: ["ignore", "ignore", "pipe"],
  });
  // Chrome exits 0 even when it logs harmless GPU warnings; judge by output.
  if (result.status !== 0 || !fs.existsSync(outPath)) {
    const err = (result.stderr || "").trim().split("\n").slice(-3).join("\n");
    throw new Error(`chrome could not render ${path.basename(htmlPath)}: ${err}`);
  }
}

function validateRenderedPdf(outPath) {
  const check = validatePdf(fs.readFileSync(outPath));
  if (!check.ok) {
    throw new Error(
      `${path.basename(outPath)} is not a valid PDF: ${check.errors.join("; ")}`
    );
  }
  return check;
}

/* ---------- usage pages ---------- */

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const USAGE_CSS = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Georgia, "Times New Roman", serif; color: #4a3527;
         background: #fffaf3; font-size: 17px; line-height: 1.6; }
  .wrap { max-width: 680px; margin: 0 auto; padding: 48px 24px 72px; }
  a { color: #b45832; }
  a.back { font-size: 14px; text-decoration: none; color: #8a6f52; }
  h1 { font-size: 30px; color: #b45832; line-height: 1.25; margin: 8px 0 4px; }
  h2 { font-size: 19px; color: #8a5a3b; margin-top: 28px; }
  .kicker { font-family: Arial, sans-serif; font-size: 12px; letter-spacing: .12em;
            text-transform: uppercase; color: #a08665; margin: 0; }
  .tagline { font-style: italic; color: #7d6248; margin-top: 0; }
  .rule { border: 0; border-top: 2px solid #e6d2b8; margin: 24px 0; }
  ol { padding-left: 20px; }
  li { margin: 8px 0; }
  .card { background: #fff; border: 1px solid #e6d2b8; border-radius: 10px;
          padding: 6px 20px; margin: 18px 0; }
  .card a { text-decoration: none; }
  .card:hover { border-color: #cf9d74; }
  .card h3 { margin: 14px 0 2px; font-size: 19px; color: #b45832; }
  .card p { margin: 2px 0 14px; color: #7d6248; }
  .btn { display: inline-block; margin: 10px 0 26px; padding: 10px 20px;
         border: 1.5px solid #b45832; border-radius: 8px; text-decoration: none;
         font-size: 16px; background: #fff; }
  .btn:hover { background: #fdf1e8; }
  footer { margin-top: 44px; font-size: 13px; color: #8a6f52; text-align: center; }
`;

function usageBody(sheet) {
  return `
  <p><a class="back" href="index.html">&larr; All sheets</a></p>
  <p class="kicker">${esc(PACK.name)}</p>
  <h1>${esc(sheet.title)}</h1>
  <p class="tagline">${esc(sheet.tagline)}</p>
  <a class="btn" href="../printables/${esc(sheet.id)}.pdf">Open the printable PDF &rarr;</a>
  <p>${esc(sheet.intro)}</p>
  <h2>How to use it</h2>
  <ol>
    ${sheet.steps.map((s) => `<li>${esc(s)}</li>`).join("\n    ")}
  </ol>
  <h2>Where to put it</h2>
  <p>${esc(sheet.where)}</p>
  <h2>What to fill in</h2>
  <p>${esc(sheet.fill)}</p>
  <footer>Free, local, and unbranded. Built with love for the art of hosting.</footer>`;
}

function indexBody() {
  return `
  <p class="kicker">${esc(PACK.name)}</p>
  <h1>${esc(PACK.name)}</h1>
  <p class="tagline">${esc(PACK.tagline)}</p>
  <p>${esc(PACK.intro)}</p>
  <h2>The eight sheets</h2>
  ${SHEETS.map(
    (s) => `
  <div class="card">
    <h3><a href="${esc(s.id)}.html">${esc(s.title)}</a></h3>
    <p>${esc(s.tagline)} &mdash; <a href="../printables/${esc(s.id)}.pdf">PDF</a> &middot; <a href="${esc(
      s.id
    )}.html">how to use</a></p>
  </div>`
  ).join("")}
  <footer>Free to print, free to share. <a href="../README.md">About this project</a> &middot; MIT license.</footer>`;
}

function renderHtml(title, body, css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>${css}</style>
</head>
<body>
  <div class="wrap">
${body}
  </div>
</body>
</html>
`;
}

/* ---------- main ---------- */

function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.error(
      "No headless-capable Chrome/Chromium found on PATH. " +
        "Install Chrome, or point CHROME_BIN at a Chrome/Chromium binary."
    );
    process.exit(1);
  }
  console.log(`Building with: ${chrome}`);

  fs.mkdirSync(PRINTABLES_DIR, { recursive: true });
  fs.mkdirSync(USAGE_DIR, { recursive: true });

  let ok = 0;
  const failures = [];
  for (const sheet of SHEETS) {
    const htmlPath = path.join(HTML_DIR, `${sheet.id}.html`);
    const outPath = path.join(PRINTABLES_DIR, `${sheet.id}.pdf`);
    try {
      if (!fs.existsSync(htmlPath)) {
        throw new Error(`missing HTML source: ${htmlPath}`);
      }
      renderPdf(chrome, htmlPath, outPath);
      const check = validateRenderedPdf(outPath);
      ok += 1;
      console.log(
        `  ${sheet.id}.pdf  valid (${check.pages} page${check.pages === 1 ? "" : "s"}, ${check.size} bytes)`
      );
      fs.writeFileSync(
        path.join(USAGE_DIR, `${sheet.id}.html`),
        renderHtml(sheet.title, usageBody(sheet), USAGE_CSS)
      );
    } catch (err) {
      failures.push(`${sheet.id}: ${err.message}`);
      console.error(`  FAILED ${sheet.id}: ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(USAGE_DIR, "index.html"),
    renderHtml(PACK.name, indexBody(), USAGE_CSS)
  );

  console.log(`\nPDFs built: ${ok}/${SHEETS.length}`);
  console.log(`Usage pages written to ${path.relative(ROOT, USAGE_DIR)}/`);

  if (failures.length > 0) {
    console.error("\nFailures:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
}

main();
