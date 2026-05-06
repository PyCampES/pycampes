import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollToAnchor from "./components/ScrollToAnchor/ScrollToAnchor";

function Layout() {
  return (
    <>
      <ScrollToAnchor />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default Layout;
