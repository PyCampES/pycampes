import { copyFileSync, existsSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
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
    // Control which routes get pre-rendered to static files. This replaces
    // vite-react-ssg's default filter, so we must reproduce it:
    //   - drop "*" / ":" routes (the catch-all and any dynamic params), which
    //     have no single concrete URL to render;
    //   - drop "index.html", whose physical file already comes from the index
    //     route — rendering it would collide with dist/index.html (EISDIR).
    includedRoutes: (paths) =>
      paths.filter(
        (path) =>
          !path.includes("*") &&
          !path.includes(":") &&
          path !== "index.html"
      ),

    // With dirStyle "nested" the "404" route is pre-rendered to 404/index.html,
    // but Read the Docs serves the file named 404.html for unknown URLs, so we
    // copy it there once the build is done.
    onFinished: (outDir) => {
      const out = isAbsolute(outDir) ? outDir : resolve(process.cwd(), outDir);
      const source = join(out, "404", "index.html");
      if (existsSync(source)) {
        copyFileSync(source, join(out, "404.html"));
      }
    },
  },
});
