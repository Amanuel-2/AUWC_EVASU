import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../context/LanguageContext";
import OptimizedImage from "../components/OptimizedImage";
import AuthHeader from "../components/AuthHeader";

const TOTAL_STEPS = 4;
type FieldName = "name" | "email" | "phone" | "department" | "yearOfStudy" | "gender" | "password";

export default function Register() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState(""); const [department, setDepartment] = useState(""); const [yearOfStudy, setYearOfStudy] = useState(""); const [gender, setGender] = useState(""); const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement | null>>>({});
  const { register } = useAuth(); const navigate = useNavigate(); const { t } = useLanguage();
  const perks = [t("perkTeams"), t("perkEvents"), t("perkStudents"), t("perkResources")];

  const setField = (field: FieldName, value: string) => {
    const setters: Record<FieldName, (next: string) => void> = { name: setName, email: setEmail, phone: setPhone, department: setDepartment, yearOfStudy: setYearOfStudy, gender: setGender, password: setPassword };
    setters[field](value); setFieldErrors((current) => ({ ...current, [field]: "" })); setError("");
  };

  const validateStep = (stepToValidate: number) => {
    const errors: Partial<Record<FieldName, string>> = {};
    if (stepToValidate === 0) { if (name.trim().length < 2) errors.name = "Please enter your full name."; if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Please enter a valid email address."; }
    if (stepToValidate === 1) { if (!phone.trim()) errors.phone = "Please enter your phone number."; if (department.trim().length < 2) errors.department = "Please enter your department."; }
    if (stepToValidate === 2) { if (!yearOfStudy) errors.yearOfStudy = "Please select your year of study."; if (!gender) errors.gender = "Please select your gender."; }
    if (stepToValidate === 3 && password.length < 6) errors.password = "Password must be at least 6 characters.";
    setFieldErrors(errors); const firstInvalid = Object.keys(errors)[0] as FieldName | undefined; if (firstInvalid) window.setTimeout(() => fieldRefs.current[firstInvalid]?.focus(), 0); return !firstInvalid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); if (loading) return; if (!validateStep(step)) return;
    if (step < TOTAL_STEPS - 1) { setStep((current) => current + 1); return; }
    setLoading(true); setError("");
    try {
      const registeredUser = await register(name, email, password, phone, department, yearOfStudy, gender);
      if (registeredUser) navigate("/");
    } catch (registrationError) {
      setError(registrationError instanceof Error ? registrationError.message : "We could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: FieldName) => `w-full px-4 py-3 bg-input-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors[field] ? "border-destructive" : "border-border"}`;
  const fieldProps = (fieldName: FieldName) => ({ ref: (element: HTMLInputElement | HTMLSelectElement | null) => { fieldRefs.current[fieldName] = element; }, "aria-invalid": Boolean(fieldErrors[fieldName]), "aria-describedby": fieldErrors[fieldName] ? `${fieldName}-error` : undefined });
  const errorMessage = (fieldName: FieldName) => fieldErrors[fieldName] ? <p id={`${fieldName}-error`} className="mt-1.5 text-xs text-destructive" role="alert">{fieldErrors[fieldName]}</p> : null;
  const headings = ["Tell us about you", "Your campus details", "A little more about you", "Secure your account"];
  const descriptions = ["Let’s start with the basics.", "This helps us understand and serve our student community.", "These details help us welcome you well.", "Choose a password you’ll remember and keep private."];

  return <div className="relative min-h-screen grid lg:grid-cols-2">
    <AuthHeader to="/" label={t("backHome")} className="lg:hidden" /><div className="absolute right-4 top-4 z-20"><LanguageToggle /></div>
    <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
      <AuthHeader to="/" label={t("backHome")} light className="hidden lg:flex" /><div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" /><div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative"><h2 className="font-['DM_Serif_Display'] text-4xl text-white mb-4 leading-tight">{t("createTitle")}</h2><p className="text-white/70 text-sm leading-relaxed mb-8">{t("heroText")}</p><ul className="space-y-3">{perks.map((perk) => <li key={perk} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Check size={11} className="text-white" /></div><span className="text-sm text-white/80">{perk}</span></li>)}</ul></div>
      <div className="relative"><OptimizedImage src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=200&fit=crop&auto=format" alt="Community" className="rounded-2xl opacity-60 w-full h-28 object-cover" width={500} height={200} critical /></div>
    </div>
    <div className="flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-16 bg-background"><div className="w-full max-w-md rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-8" aria-label={`Registration progress: step ${step + 1} of ${TOTAL_STEPS}`}><div className="mb-3 flex items-center justify-between text-xs font-semibold text-muted-foreground"><span>Step {step + 1} of {TOTAL_STEPS}</span><span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} /></div></div>
      <div className="mb-8"><h1 className="font-['DM_Serif_Display'] text-3xl text-foreground mb-2">{headings[step]}</h1><p className="text-muted-foreground text-sm">{descriptions[step]}</p></div>
      {error && <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl px-4 py-3 mb-6" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
        {step === 0 && <div className="space-y-5"><div><label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("fullName")}</label><input id="name" {...fieldProps("name")} type="text" autoComplete="name" value={name} onChange={(event) => setField("name", event.target.value)} placeholder="Amara Osei" className={inputClass("name")} />{errorMessage("name")}</div><div><label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("universityEmail")}</label><input id="email" {...fieldProps("email")} type="email" autoComplete="email" value={email} onChange={(event) => setField("email", event.target.value)} placeholder="you@auwcec.edu" className={inputClass("email")} />{errorMessage("email")}</div></div>}
        {step === 1 && <div className="space-y-5"><div><label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone number</label><input id="phone" {...fieldProps("phone")} type="tel" autoComplete="tel" value={phone} onChange={(event) => setField("phone", event.target.value)} placeholder="+253 77 123 456" className={inputClass("phone")} />{errorMessage("phone")}</div><div><label htmlFor="department" className="block text-sm font-medium text-foreground mb-2">{t("department")}</label><input id="department" {...fieldProps("department")} type="text" value={department} onChange={(event) => setField("department", event.target.value)} placeholder="Computer Science" className={inputClass("department")} />{errorMessage("department")}</div></div>}
        {step === 2 && <div className="space-y-5"><div><label htmlFor="yearOfStudy" className="block text-sm font-medium text-foreground mb-2">Year of study</label><select id="yearOfStudy" {...fieldProps("yearOfStudy")} value={yearOfStudy} onChange={(event) => setField("yearOfStudy", event.target.value)} className={inputClass("yearOfStudy")}><option value="">Select year</option><option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>Graduate</option></select>{errorMessage("yearOfStudy")}</div><div><label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">Gender</label><select id="gender" {...fieldProps("gender")} value={gender} onChange={(event) => setField("gender", event.target.value)} className={inputClass("gender")}><option value="">Select gender</option><option>Female</option><option>Male</option></select><p className="mt-1.5 text-xs text-muted-foreground">Used only to help organize fellowship care and community support.</p>{errorMessage("gender")}</div></div>}
        {step === 3 && <div className="space-y-5"><div><label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">{t("password")}</label><div className="relative"><input id="password" {...fieldProps("password")} type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setField("password", event.target.value)} placeholder={t("password")} className={`${inputClass("password")} pr-12`} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{errorMessage("password")}</div><p className="text-xs text-muted-foreground leading-relaxed">{t("terms")}</p></div>}
        <div className="mt-8 flex items-center gap-3"><button type="button" onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0 || loading} className="flex-1 rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:invisible">Back</button><button type="submit" disabled={loading} className="flex-[1.5] rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? t("creating") : step === TOTAL_STEPS - 1 ? t("createButton") : "Continue"}</button></div>
      </form><p className="text-center text-sm text-muted-foreground mt-8">{t("already")} <Link to="/login" className="text-primary font-semibold hover:underline">{t("signIn")}</Link></p>
    </div></div>
  </div>;
}
