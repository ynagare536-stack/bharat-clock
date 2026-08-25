import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/bharat-clock/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
