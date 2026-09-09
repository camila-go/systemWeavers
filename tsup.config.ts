import path from "node:path";
import { defineConfig } from "tsup";

// Builds a standalone component-library bundle from design-system/entry.ts,
// separate from `next build` (which builds the whole app, not an importable
// module). Used by the design-sync tooling as the converter's --entry.
export default defineConfig({
  entry: { index: "design-system/entry.ts" },
  outDir: "dist",
  format: ["esm"],
  outExtension: () => ({ js: ".js" }),
  dts: { compilerOptions: { incremental: false } },
  clean: true,
  platform: "browser",
  target: "es2020",
  external: ["react", "react-dom"],
  noExternal: ["next"],
  esbuildOptions(options) {
    options.alias = {
      "next/link": path.resolve(__dirname, "design-system/shims/next-link.tsx"),
      "next/image": path.resolve(__dirname, "design-system/shims/next-image.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "design-system/shims/next-navigation.ts",
      ),
    };
    options.loader = { ...options.loader, ".png": "dataurl", ".jpg": "dataurl" };
  },
});
