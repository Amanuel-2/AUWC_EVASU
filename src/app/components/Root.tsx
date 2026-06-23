import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Root() {
  const location = useLocation();
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}
