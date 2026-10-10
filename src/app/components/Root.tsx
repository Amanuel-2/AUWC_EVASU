import { type CSSProperties, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import BrandLogo from "./BrandLogo";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Root() {
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return sessionStorage.getItem("auwc-ecsf-intro-seen") !== "true";
    } catch {
      return true;
    }
  });
  const [fadeLoader, setFadeLoader] = useState(false);
  const location = useLocation();
  const hideChrome = ["/login", "/register"].includes(location.pathname) || location.pathname.startsWith("/leader") || location.pathname.startsWith("/admin");

  useEffect(() => {
    if (!showLoader) return;

    try {
      sessionStorage.setItem("auwc-ecsf-intro-seen", "true");
    } catch {
      // The timed fallback below still lets the app continue if storage is unavailable.
    }

    const fadeTimer = window.setTimeout(() => setFadeLoader(true), 1900);
    const removeTimer = window.setTimeout(() => setShowLoader(false), 2400);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [showLoader]);

  return (
    <>
      {showLoader && (
        <div
          className={`intro-overlay fixed inset-0 z-[100] grid place-items-center transition-opacity duration-500 ${fadeLoader ? "pointer-events-none opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        >
          <div className="intro-content flex flex-col items-center">
            <div className="intro-mark relative grid place-items-center">
              <svg className="intro-ring absolute inset-0 h-full w-full" viewBox="0 0 240 240" aria-hidden="true">
                <circle cx="120" cy="120" r="105" fill="none" />
              </svg>
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index} className="intro-dot" style={{ "--dot-index": index } as CSSProperties} />
              ))}
              <BrandLogo compact className="intro-logo" />
            </div>
            <div className="intro-message mt-8 text-center">
              <p className="font-['DM_Serif_Display'] text-xl text-primary sm:text-2xl">Grow Together. Serve Together. Shine Together.</p>
              <span className="intro-divider mx-auto mt-4 block h-px w-16 bg-primary/45" />
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {!hideChrome && <Navbar />}
        <div className="flex-1">
          <Outlet />
        </div>
        {!hideChrome && <Footer />}
      </div>
    </>
  );
}
