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

    // With dirStyle "nested" the "404" route is pre-rendered to 404/index.html,
    // but Read the Docs serves the file named 404.html for unknown URLs, so we
    // copy it there once the build is done. The "*" catch-all route is skipped
    // by vite-react-ssg's default includedRoutes (it ignores wildcard paths).
    onFinished: (outDir) => {
      const out = isAbsolute(outDir) ? outDir : resolve(process.cwd(), outDir);
      const source = join(out, "404", "index.html");
      if (existsSync(source)) {
        copyFileSync(source, join(out, "404.html"));
      }
    },
  },
});
