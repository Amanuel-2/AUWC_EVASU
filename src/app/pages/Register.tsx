import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const perks = [
  "Join multiple ministry teams",
  "Get updates on all fellowship events",
  "Connect with 500+ students",
  "Access members-only resources",
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    const ok = await register(name, email, password);
    setLoading(false);
    if (ok) navigate("/");
    else setError("Something went wrong. Please try again.");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white text-lg">✦</span>
            </div>
            <span className="font-['DM_Serif_Display'] text-xl text-white">Radiance Fellowship</span>
          </Link>
        </div>

        <div className="relative">
          <h2 className="font-['DM_Serif_Display'] text-4xl text-white mb-4 leading-tight">
            Start your journey<br />with us today
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Becoming a member opens doors to community, growth, and purpose that will shape the rest of your life.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-sm text-white/80">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=200&fit=crop&auto=format"
            alt="Community"
            className="rounded-2xl opacity-60 w-full h-28 object-cover"
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mb-10">
            <h1 className="font-['DM_Serif_Display'] text-4xl text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground text-sm">{"Join Radiance Fellowship — it's completely free"}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amara Osei"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">University email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              By registering, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
