import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import BrandLogo from "./BrandLogo";

export default function AuthHeader({ to, label, light = false, className = "" }: { to: string; label: string; light?: boolean; className?: string }) {
  return (
    <div className={`absolute left-6 top-6 z-30 flex flex-col items-start gap-3 lg:left-12 lg:top-10 ${className}`}>
      <Link to="/" aria-label="AUWC ECSF home"><BrandLogo variant={light ? "light" : "dark"} /></Link>
      <Link to={to} className={`inline-flex items-center gap-2 text-sm transition-colors ${light ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>
        <ArrowLeft size={16} aria-hidden="true" /> {label}
      </Link>
    </div>
  );
}
