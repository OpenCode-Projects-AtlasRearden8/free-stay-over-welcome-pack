// Small dependency-free PDF sanity checks shared by the build and the tests.
// A "valid" PDF here means: correct header, an EOF marker that terminates the
// file, a reasonable size, and at least one page object.

export function validatePdf(buf) {
  const errors = [];
  const text = buf.toString("latin1");

  const headerOk = text.startsWith("%PDF-");
  if (!headerOk) errors.push("missing %PDF- header");

  const tail = text.slice(-1024);
  const eofOk = tail.includes("%%EOF");
  if (!eofOk) errors.push("missing %%EOF trailer near end of file");

  const sizeOk = buf.length > 2048;
  if (!sizeOk) errors.push(`file suspiciously small (${buf.length} bytes)`);

  // Word boundary so /Pages does not count as a page object.
  const pages = (text.match(/\/Type\s*\/Page\b/g) || []).length;
  if (pages < 1) errors.push("no /Type /Page objects found");

  return { ok: errors.length === 0, size: buf.length, pages, errors };
}
