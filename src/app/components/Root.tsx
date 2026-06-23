import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Root() {
  const location = useLocation();
  const hideChrome = ["/login", "/register"].includes(location.pathname) || location.pathname.startsWith("/leader") || location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {!hideChrome && <Footer />}
    </div>
  );
}
