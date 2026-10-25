import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contentPlugin } from "./scripts/content-plugin";

// Published as a project site at https://nhemapriya.github.io/Portfolio/.
export default defineConfig({
  base: "/Portfolio/",
  plugins: [contentPlugin(), react(), tailwindcss()],
});
