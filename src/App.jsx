import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Diversity from "./pages/Diversity/Diversity";
import Faqs from "./pages/Faqs/Faqs";
import PreviousEditions from "./pages/PreviousEditions/PreviousEditions";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "event", element: <Event /> },
      { path: "diversity", element: <Diversity /> },
      { path: "faqs", element: <Faqs /> },
      { path: "previous-editions", element: <PreviousEditions /> },
    ],
  },
];
