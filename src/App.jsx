import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollToAnchor from "./components/ScrollToAnchor/ScrollToAnchor";

import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Diversity from "./pages/Diversity/Diversity";
import Faqs from "./pages/Faqs/Faqs";
import PreviousEditions from "./pages/PreviousEditions/PreviousEditions";

function App() {
  return (
    <HashRouter>
      <ScrollToAnchor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route path="/diversity" element={<Diversity />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/previous-editions" element={<PreviousEditions />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
