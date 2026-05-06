import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Read the Docs sets these at build time. Locally they're undefined,
// so Vite falls back to its defaults (base "/", outDir "dist").
const rtdBase = process.env.READTHEDOCS_CANONICAL_URL;
const rtdOutput = process.env.READTHEDOCS_OUTPUT;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: rtdBase || "/",
  build: {
    outDir: rtdOutput ? `${rtdOutput}/html` : "dist",
  },
  ssgOptions: {
    dirStyle: "nested",
  },
});
