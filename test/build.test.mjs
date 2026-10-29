// Tests for the stay-over welcome pack.
//
// The build is the product, so the test suite:
//   1. Runs one build from scratch (like a fresh user would).
//   2. Verifies every sheet produced a valid PDF in printables/.
//   3. Verifies a warm usage page exists per sheet, plus the index page.
//   4. Verifies the printable sources stay unbranded and printable.

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SHEETS } from "../sheets/config.mjs";
import { validatePdf } from "../lib/pdf-utils.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.join(ROOT, "..");
const HTML_DIR = path.join(PROJECT, "sheets", "html");
const PRINTABLES_DIR = path.join(PROJECT, "printables");
const USAGE_DIR = path.join(PROJECT, "usage");

let buildResult = { status: null, stderr: "" };

before(() => {
  buildResult = execFileSync(process.execPath, ["build.mjs"], {
    cwd: PROJECT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
    ? { status: 0, stderr: "" }
    : { status: 1, stderr: "unexpected" };
});

describe("build", () => {
  it("runs cleanly with one command", () => {
    assert.equal(buildResult.status, 0, "node build.mjs should exit 0");
  });
});

describe("printables", () => {
  for (const sheet of SHEETS) {
    it(`${sheet.id} builds a valid PDF`, () => {
      const pdfPath = path.join(PRINTABLES_DIR, `${sheet.id}.pdf`);
      assert.ok(fs.existsSync(pdfPath), `${pdfPath} should exist`);
      const check = validatePdf(fs.readFileSync(pdfPath));
      assert.ok(
        check.ok,
        `${sheet.id}.pdf should be a valid PDF: ${check.errors.join("; ")}`
      );
      assert.ok(check.pages >= 1, "PDF should have at least one page");
    });
  }

  it("contains exactly the configured sheets", () => {
    const built = fs
      .readdirSync(PRINTABLES_DIR)
      .filter((f) => f.endsWith(".pdf"))
      .sort();
    const expected = SHEETS.map((s) => `${s.id}.pdf`).sort();
    assert.deepEqual(built, expected);
  });
});

// Generated HTML escapes entities; unescape so tests can match config copy.
const unescapeHtml = (html) => html.replace(/&amp;/g, "&");

describe("usage pages", () => {
  it("generates an index page", () => {
    const page = unescapeHtml(
      fs.readFileSync(path.join(USAGE_DIR, "index.html"), "utf8")
    );
    for (const sheet of SHEETS) {
      assert.ok(page.includes(sheet.title), `index should list "${sheet.title}"`);
    }
  });

  for (const sheet of SHEETS) {
    it(`${sheet.id} has a warm usage page`, () => {
      const page = unescapeHtml(
        fs.readFileSync(path.join(USAGE_DIR, `${sheet.id}.html`), "utf8")
      );
      assert.ok(page.includes(`<h1>${sheet.title}</h1>`), "usage page has a title");
      assert.ok(
        page.includes(`../printables/${sheet.id}.pdf`),
        "usage page links to the PDF"
      );
      assert.ok(page.includes(sheet.where), "usage page mentions where it goes");
      assert.ok(page.includes("How to use it"), "usage page has usage steps");
    });
  }
});

describe("sources", () => {
  for (const sheet of SHEETS) {
    it(`${sheet.id}.html exists and is printable`, () => {
      const source = fs.readFileSync(
        path.join(HTML_DIR, `${sheet.id}.html`),
        "utf8"
      );
      assert.ok(source.includes(`../css/pack.css`), "links shared print styles");
      assert.ok(
        source.toLowerCase().includes("@page") ||
          fs.readFileSync(path.join(PROJECT, "sheets", "css", "pack.css"), "utf8").includes("@page"),
        "page setup is defined for print"
      );
    });

    it(`${sheet.id}.html is unbranded`, () => {
      const source = fs.readFileSync(
        path.join(HTML_DIR, `${sheet.id}.html`),
        "utf8"
      );
      assert.ok(!/asdale/i.test(source), "sheet HTML mentions no brand name");
      assert.ok(!/http/i.test(source.replace(/xmlns\S*/g, "")), "sheet HTML has no outbound links");
    });
  }
});
