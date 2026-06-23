import { Link } from "react-router";
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white text-lg">✦</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['DM_Serif_Display'] text-lg text-background">Radiance</span>
                <span className="text-[11px] text-background/50 tracking-widest uppercase font-medium">Fellowship</span>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              A community of students growing in faith, serving with love, and impacting our campus and beyond.
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
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Teams", "Events", "Contact"].map((item) => (
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
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">Our Teams</h4>
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
            <h4 className="text-sm font-semibold text-background/90 uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/60 leading-relaxed">
                  Fellowship Building, University of Greenfields, Block C, Room 101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:hello@radiancefellowship.org" className="text-sm text-background/60 hover:text-background transition-colors">
                  hello@radiancefellowship.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+1234567890" className="text-sm text-background/60 hover:text-background transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} Radiance Fellowship. All rights reserved.
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
