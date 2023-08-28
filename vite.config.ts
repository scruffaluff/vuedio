// Vite web builder configuration file.
//
// For more information, visit https://vitejs.dev/config.

import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "../dist",
  },
  plugins: [vue()],
  publicDir: "../public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  root: "src",
  test: {
    include: ["src/**/*.test.ts"],
    root: ".",
  },
});
