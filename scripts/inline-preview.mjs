// Turns the Next static export in ./out into self-contained, file://-openable
// HTML previews in ./preview — CSS inlined, fonts base64-embedded, scripts
// stripped. Produces a faithful visual render (client JS is inert).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";

const OUT = "out";
const DEST = "preview";

// Read the single exported stylesheet and inline its woff2 url()s as base64.
function buildInlineCss() {
  const chunksDir = join(OUT, "_next/static/chunks");
  const cssName = readdirSync(chunksDir).find((f) => f.endsWith(".css"));
  if (!cssName) throw new Error("No exported stylesheet found under " + chunksDir);
  const cssDir = chunksDir;
  let css = readFileSync(join(chunksDir, cssName), "utf8");
  // Font urls are relative to the css file, e.g. url(../media/xyz.woff2).
  css = css.replace(/url\(([^)'"]+\.woff2)\)/g, (m, p) => {
    const data = readFileSync(join(cssDir, p));
    return `url(data:font/woff2;base64,${data.toString("base64")})`;
  });
  return css;
}

function transform(html, inlineCss) {
  return html
    // Replace the external stylesheet link with the inlined CSS.
    .replace(
      /<link[^>]*rel="stylesheet"[^>]*>/g,
      `<style>${inlineCss}</style>`
    )
    // Drop scripts, preloads and the favicon (all reference absolute /_next paths).
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]*rel="preload"[^>]*>/g, "")
    .replace(/<link[^>]*rel="icon"[^>]*>/g, "")
    .replace(/<link[^>]*rel="preconnect"[^>]*>/g, "");
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

const inlineCss = buildInlineCss();
const htmlFiles = walk(OUT);
for (const file of htmlFiles) {
  const rel = relative(OUT, file);
  const out = join(DEST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, transform(readFileSync(file, "utf8"), inlineCss));
}
console.log(`Wrote ${htmlFiles.length} self-contained previews to ./${DEST}`);
