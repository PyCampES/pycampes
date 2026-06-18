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
    // The "index.html" route only exists so React Router can match the
    // literal /index.html URL at runtime; the physical file already comes
    // from the index route, so skip pre-rendering it (it would collide with
    // dist/index.html and fail with EISDIR).
    includedRoutes: (paths) => paths.filter((path) => path !== "index.html"),
  },
});
