import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "teams", href: "/#teams" },
  { key: "events", href: "/#events" },
  { key: "contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const dashboardPath = user?.role === "admin" ? "/admin" : user?.role === "team_leader" ? "/leader" : "";
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleAnchor = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F5F8FB]/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="group transition-transform duration-200 hover:scale-[1.02]">
            <BrandLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.key}
                  onClick={() => handleAnchor(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t(link.key)}
                </button>
              ) : (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t(link.key)}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors duration-200"
                >
                  <User size={15} />
                  {user.name.split(" ")[0]}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-card border border-border rounded-xl shadow-lg py-2 min-w-[160px]">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {dashboardPath && (
                      <Link
                        to={dashboardPath}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <User size={14} /> {t("dashboard")}
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut size={14} /> {t("signOut")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 px-4 py-2"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-[#F5F8FB]/98 backdrop-blur-md border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.key}
                onClick={() => { handleAnchor(link.href); setMenuOpen(false); }}
                className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                {t(link.key)}
              </button>
            ) : (
              <Link
                key={link.key}
                to={link.href}
                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                {t(link.key)}
              </Link>
            )
          )}
          <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
            <LanguageToggle />
            {user ? (
              <>
                {dashboardPath && (
                  <Link
                    to={dashboardPath}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                  >
                    <User size={14} /> {t("dashboard")}
                  </Link>
                )}
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-muted-foreground"
                >
                  <LogOut size={14} /> {t("signOut")} ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-3 px-4 text-sm font-medium text-center border border-border rounded-xl hover:bg-secondary transition-colors">
                  {t("login")}
                </Link>
                <Link to="/register" className="py-3 px-4 text-sm font-medium text-center bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
