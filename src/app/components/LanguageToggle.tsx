import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const { language, toggleLanguage, t } = useLanguage();
  const label = language === "am" ? "English" : "አማርኛ";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("language")}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${light ? "border-white/20 text-white hover:bg-white/10" : "bg-background text-foreground hover:bg-secondary"}`}
    >
      <Languages size={16} aria-hidden="true" />
      {!compact && <span>{label}</span>}
    </button>
  );
}
