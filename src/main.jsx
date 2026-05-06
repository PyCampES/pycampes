import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App.jsx";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/global.css";

// BASE_URL is "/" in dev and the value of `vite build --base` in production.
// On Read the Docs that's the canonical URL (e.g. https://pycamp.es/2026/),
// so we extract the pathname for the router's basename.
const basename = new URL(
  import.meta.env.BASE_URL,
  typeof window !== "undefined" ? window.location.origin : "http://localhost"
).pathname;

export const createRoot = ViteReactSSG({ routes, basename });
