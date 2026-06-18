import { Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Diversity from "./pages/Diversity/Diversity";
import Faqs from "./pages/Faqs/Faqs";
import PreviousEditions from "./pages/PreviousEditions/PreviousEditions";
import NotFound from "./pages/NotFound/NotFound";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Redirect the literal /index.html URL to the home page. React Router
      // strips the basename (e.g. /2027/) and is left with "/index.html",
      // which otherwise wouldn't match any route.
      { path: "index.html", element: <Navigate to="/" replace /> },
      { path: "event", element: <Event /> },
      { path: "diversity", element: <Diversity /> },
      { path: "faqs", element: <Faqs /> },
      { path: "previous-editions", element: <PreviousEditions /> },
      // "404" is pre-rendered to a static 404.html (see vite.config.js) that
      // Read the Docs serves for unknown URLs; "*" catches broken links during
      // in-app navigation. Both render the same page.
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
