// Compiles the real Tailwind output (app/globals.css + the utility classes
// components actually use) for the design-sync bundle. tsup only builds JS —
// it has no idea about Tailwind, so without this step previews would render
// with none of their actual utility classes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = path.resolve(import.meta.dirname, "..");
const input = readFileSync(path.join(root, "app/globals.css"), "utf8");

const result = await postcss([tailwindcss()]).process(input, {
  from: path.join(root, "app/globals.css"),
  to: path.join(root, "dist/styles.css"),
});

// The real site self-hosts these via next/font/google in app/layout.tsx,
// which sets --font-fraunces/--font-public-sans on <html> — that's outside
// this design-system entry, so components ship referencing undefined
// variables. A remote Google Fonts @import (must precede all other rules)
// keeps the design-sync bundle self-contained without touching the real
// site's self-hosted fonts.
const FONTS_PREAMBLE = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Public+Sans:wght@400;500;600;700&display=swap');
:root {
  --font-fraunces: "Fraunces", serif;
  --font-public-sans: "Public Sans", sans-serif;
}
`;

mkdirSync(path.join(root, "dist"), { recursive: true });
writeFileSync(path.join(root, "dist/styles.css"), FONTS_PREAMBLE + result.css);
console.log(`dist/styles.css ${((FONTS_PREAMBLE.length + result.css.length) / 1024).toFixed(1)} KB`);
