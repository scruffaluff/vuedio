/**
 * Vite configuration file for building web projects.
 *
 * For more information, visit https://vitejs.dev/config.
 */

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import url, { URL } from "node:url";
import * as vitePluginHtml from "vite-plugin-html";
import * as vitest from "vitest/config";

export default vitest.defineConfig({
  build: {
    cssMinify: "lightningcss",
    emptyOutDir: true,
    outDir: "../build/dist",
  },
  plugins: [
    vue(),
    tailwindcss(),
    vitePluginHtml.createHtmlPlugin({ minify: true }),
  ],
  publicDir: "../data",
  resolve: {
    alias: {
      "@": url.fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  root: "src",
  test: {
    include: ["**/*.test.ts"],
  },
});
