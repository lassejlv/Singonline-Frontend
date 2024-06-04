import includeHtml from "vite-include-html-plugin";
import { defineConfig } from "vite";
import path, { resolve } from "path";
import fs from "fs";
import { Logger } from "term-logger";

const dir = "./src";
const ignore = ["components"];
const start = Date.now();

// Read all folders in the pages directory
const pages = fs.readdirSync(dir).filter((f) => {
  const fullPath = path.join(dir, f);
  const fileStat = fs.statSync(fullPath);

  if (fileStat.isDirectory() && !ignore.includes(f)) {
    return true;
  } else {
    Logger.warn(`Ignoring file: ${f}`);
  }
});

// Generate all the inputs for the pages
const pagesInputs: Record<string, string> = {};

pages.forEach((page) => {
  const path = `${dir}/${page}/index.html`;

  if (!fs.existsSync(path)) {
    // Correct the existence check and pass the path
    return;
  }

  // Register the page
  pagesInputs[page] = resolve(__dirname, path);

  Logger.complete(`Registered page: ${page} in ${Date.now() - start}ms`);
});

export default defineConfig({
  root: "src",
  publicDir: "../public",
  server: { port: 6969 },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        ...pagesInputs,
      },
    },
  },
  plugins: [includeHtml()],
});
