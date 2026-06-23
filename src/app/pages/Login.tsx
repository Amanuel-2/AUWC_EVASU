import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "../components/BrandLogo";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";
  const { t } = useLanguage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      const normalizedEmail = email.trim().toLowerCase();
      const isAdmin = normalizedEmail === "admin@auwcec.edu";
      const leaderEmails = [
        "media@auwcec.edu",
        "fund@auwcec.edu",
        "leader1@gmail.com",
        "leader2@gmail.com",
        "leader3@gmail.com",
        "leader4@gmail.com",
        "leader5@gmail.com",
        "leader6@gmail.com",
        "leader7@gmail.com",
        "leader8@gmail.com",
      ];
      const isLeader = leaderEmails.includes(normalizedEmail);
      const fallback = isAdmin ? "/admin" : isLeader ? "/leader" : "/";
      const requestedRouteMatchesRole = isAdmin ? !from.startsWith("/leader") : isLeader ? !from.startsWith("/admin") : !from.startsWith("/admin") && !from.startsWith("/leader");
      navigate(from !== "/" && requestedRouteMatchesRole ? from : fallback, { replace: true });
    } else setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      <div className="absolute right-4 top-4 z-20"><LanguageToggle /></div>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=1200&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/90" />
        </div>
        <div className="relative">
<Link to="/"><BrandLogo variant="light" /></Link>
        </div>
        <div className="relative">
          <blockquote className="font-['DM_Serif_Display'] text-3xl text-white leading-relaxed italic mb-6">
            "Where two or three gather in my name, there am I with them."
          </blockquote>
          <cite className="text-white/50 text-sm not-italic">— Matthew 18:20</cite>
        </div>
        <div className="relative flex gap-3">
          {["💛", "🙏", "✝️"].map((e) => (
            <span key={e} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">{e}</span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft size={16} /> {t("backHome")}
          </Link>

          <div className="mb-10">
            <h1 className="font-['DM_Serif_Display'] text-4xl text-foreground mb-2">{t("welcomeBack")}</h1>
            <p className="text-muted-foreground text-sm">{t("signInSubtitle")}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <div className="mb-6 rounded-lg border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{t("demoAccounts")}</p>
            <p className="mt-1">{t("adminDemo")}</p>
            <p>{t("leaderDemo")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@auwcec.edu"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-xs text-primary hover:underline">{t("forgot")}</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md mt-2"
            >
              {loading ? t("signingIn") : t("signIn")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {t("newTo")}{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              {t("createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
