import logoUrl from "../../assets/auwcec-ecsf-logo.png";

interface BrandLogoProps {
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ variant = "dark", compact = false, className = "" }: BrandLogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const subTextColor = variant === "light" ? "text-white/65" : "text-muted-foreground";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logoUrl} alt="AUWC ECSF logo" className="size-11 rounded-md object-contain" />
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className={`text-base font-bold tracking-wide ${textColor}`}>AUWC ECSF</span>
          <span className={`mt-1 text-[11px] font-medium uppercase tracking-[0.18em] ${subTextColor}`}>Fellowship</span>
        </div>
      )}
    </div>
  );
}
