import { FormEvent, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Mail } from "lucide-react";
import AuthHeader from "../components/AuthHeader";
import LanguageToggle from "../components/LanguageToggle";
import { forgotPasswordRequest } from "../api";
import { useLanguage } from "../context/LanguageContext";

export default function ForgotPassword() {
  const { t } = useLanguage(); const [email, setEmail] = useState(""); const [loading, setLoading] = useState(false); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(""); if (!/^\S+@\S+\.\S+$/.test(email)) { setError(t("validEmail")); return; } setLoading(true); try { await forgotPasswordRequest(email.trim()); setSent(true); } catch { setError(t("requestError")); } finally { setLoading(false); } };
  return <AuthShell><AuthHeader to="/login" label={t("backToLogin")} /><div className="mb-8"><div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Mail size={22} /></div><h1 className="font-['DM_Serif_Display'] text-4xl text-foreground mb-2">{t("forgotTitle")}</h1><p className="text-muted-foreground text-sm">{t("forgotSubtitle")}</p></div>{sent ? <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-4 text-sm text-foreground">{t("resetEmailSent")}</div> : <form onSubmit={submit} className="space-y-5"><div><label htmlFor="email" className="block text-sm font-medium mb-2">{t("email")}</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={loading} className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60">{loading ? t("sending") : t("sendResetLink")}</button></form>}</AuthShell>;
}
function AuthShell({ children }: { children: ReactNode }) { return <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-background"><div className="absolute right-4 top-4"><LanguageToggle /></div><div className="w-full max-w-md pt-10"><div className="mt-10">{children}</div></div></div>; }
