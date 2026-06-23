import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Teams", href: "/#teams" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
        scrolled ? "bg-[#F8F4EE]/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="text-white text-lg">✦</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-['DM_Serif_Display'] text-lg text-foreground">Radiance</span>
              <span className="text-[11px] text-muted-foreground tracking-widest uppercase font-medium">Fellowship</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
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
                    <Link
                      to={user.role === "admin" ? "/admin" : "/leader"}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <User size={14} /> Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut size={14} /> Sign out
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
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Register
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
        } bg-[#F8F4EE]/98 backdrop-blur-md border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.label}
                onClick={() => { handleAnchor(link.href); setMenuOpen(false); }}
                className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/leader"}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                >
                  <User size={14} /> Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-muted-foreground"
                >
                  <LogOut size={14} /> Sign out ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-3 px-4 text-sm font-medium text-center border border-border rounded-xl hover:bg-secondary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="py-3 px-4 text-sm font-medium text-center bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
