import { Link } from "react-router";
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
<BrandLogo variant="light" className="mb-5" />
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              {t("heroText")}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Icon size={16} className="text-background/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">{t("home")}</h4>
            <ul className="space-y-3">
              {[t("home"), t("about"), t("teams"), t("events"), t("contact")].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry Teams */}
          <div>
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">{t("teamMembers")}</h4>
            <ul className="space-y-3">
              {["Love Sharing Team", "Art Team", "Worship Team", "Media Team", "Prayer Team", "Evangelism Team"].map((team) => (
                <li key={team}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors duration-200">
                    {team}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">{t("contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/60 leading-relaxed">
                  Fellowship Building, AUWC, Block C, Room 101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:hello@auwcec-ecsf.org" className="text-sm text-background/60 hover:text-background transition-colors">
                  hello@auwcec-ecsf.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+251900000000" className="text-sm text-background/60 hover:text-background transition-colors">
                  +251 900 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} AUWC ECSF. {t("goHome") === "Go Home" ? "All rights reserved." : "መብቱ ሁሉ የተጠበቀ ነው።"}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
