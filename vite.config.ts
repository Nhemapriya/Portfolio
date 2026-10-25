import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contentPlugin } from "./scripts/content-plugin";

// Published as a project site at https://nhemapriya.github.io/Portfolio/.
export default defineConfig({
  base: "/Portfolio/",
  plugins: [contentPlugin(), react(), tailwindcss()],
  build: {
    // Pages: the portfolio (/), talks (/talks/) and resume (/resume/).
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        talks: resolve(import.meta.dirname, "talks/index.html"),
        resume: resolve(import.meta.dirname, "resume/index.html"),
      },
    },
  },
});
