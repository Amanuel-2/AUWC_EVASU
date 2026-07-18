import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Users, Heart, Music, Palette, HandHeart, Video, BookOpen, Cross } from "lucide-react";
import { teams } from "../data/teams";
import { useLanguage } from "../context/LanguageContext";

import worshipTeam1 from "../../assets/teams/worship/20260510_125332.jpg";
import worshipTeam2 from "../../assets/teams/worship/20260510_125349.jpg";
import loveSharing1 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-02.jpg";
import loveSharing2 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-11.jpg";
import choirTeam from "../../assets/teams/choir/IMG_3224.jpg";
import mediaTeam from "../../assets/teams/media/photo_2026-06-23_20-48-02.jpg";
import artTeam from "../../assets/teams/art/photo_2026-06-23_14-54-08.jpg";

/* ── Intersection Observer hook for fade-in animations ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}



/* ── HERO ── */
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#5C1D4D 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Cross size={14} />
            <span>{t("heroBadge")}</span>
          </div>

          <h1 className="font-['DM_Serif_Display'] text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            {t("grow")} {t("serve")} {t("shine")}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            {t("heroText")}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {t("joinCommunity")}
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => document.getElementById("teams")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
            >
              {t("exploreTeams")}
            </button>
          </div>

          <div className="flex items-center gap-10 mt-12 pt-8 border-t border-border">
            {[["500+", t("activeMembers")], ["8", t("ministryTeams")], ["6+", t("yearsImpact")]].map(([num, label]) => (
              <div key={label}>
                <div className="text-3xl font-bold text-primary">{num}</div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src={worshipTeam1} alt="Worship team" className="rounded-2xl w-full h-64 object-cover shadow-md" />
              <img src={loveSharing1} alt="Love sharing team" className="rounded-2xl w-full h-48 object-cover shadow-md" />
            </div>
            <div className="space-y-4 mt-8">
              <img src={choirTeam} alt="Choir team" className="rounded-2xl w-full h-48 object-cover shadow-md" />
              <img src={mediaTeam} alt="Media team" className="rounded-2xl w-full h-64 object-cover shadow-md" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{i}</div>
              ))}
              <span className="text-sm font-semibold text-foreground ml-2">+497</span>
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();

  const cards = [
    {
      title: "Our Mission",
      icon: <Heart className="w-6 h-6" />,
      description: "To raise purpose-driven students who are deeply rooted in faith, actively serving their communities, and transforming every environment they enter.",
    },
    {
      title: "Our Vision",
      icon: <Cross className="w-6 h-6" />,
      description: "To see every student on campus encounter the living God and become a beacon of hope, excellence, and Christlike character in their generation.",
    },
    {
      title: "Core Values",
      icon: <BookOpen className="w-6 h-6" />,
      values: ["Authentic Faith", "Radical Love", "Servant Leadership", "Creative Excellence", "Community"],
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t("whoWeAre")}</span>
            <h2 className="font-['DM_Serif_Display'] text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
              {t("familyTitle")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("heroText")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-4">{card.title}</h3>
                {card.values ? (
                  <div className="space-y-2">
                    {card.values.map((value, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {value}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src={artTeam} alt="Art team" className="rounded-2xl w-full h-56 object-cover" />
            <img src={loveSharing2} alt="Community outreach" className="rounded-2xl w-full h-56 object-cover" />
            <img src={worshipTeam2} alt="Worship gathering" className="rounded-2xl w-full h-56 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TEAMS ── */
function Teams() {
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const teamIcons = {
    worship: <Music className="w-5 h-5" />,
    choir: <Music className="w-5 h-5" />,
    prayer: <Cross className="w-5 h-5" />,
    art: <Palette className="w-5 h-5" />,
    media: <Video className="w-5 h-5" />,
    "love-sharing": <HandHeart className="w-5 h-5" />,
  };

  return (
    <section id="teams" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t("ministryTeams")}</span>
            <h2 className="font-['DM_Serif_Display'] text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
              {t("teamsTitle")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, i) => (
              <div
                key={team.id}
                onClick={() => navigate(`/teams/${team.id}`)}
                className="bg-white p-6 rounded-2xl border border-border hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: team.color + "20", color: team.color }}>
                  {teamIcons[team.id as keyof typeof teamIcons] || <Users className="w-5 h-5" />}
                </div>
<<<<<<< HEAD
                <div className="p-6">
                  <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-2">{team.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{team.description}</p>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                    <Users size={14} /> {team.leaderCount} {team.leaderCount === 1 ? "leader" : "leaders"}
                  </div>
                  {team.leaderEmail && <p className="mb-5 text-xs font-medium text-muted-foreground">Leader: {team.leaderEmail}</p>}
                  {!team.leaderEmail && <div className="mb-5" />}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/teams/${team.id}`); }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                  >
                    {t("learnMore")} <ArrowRight size={15} />
                  </button>
=======
                <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-2">{team.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{team.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users size={14} />
                  <span>{team.leaderCount} {team.leaderCount === 1 ? "Leader" : "Leaders"}</span>
>>>>>>> 9a89d313 (build the ui)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ── CTA ── */
function CTA() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-['DM_Serif_Display'] text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Ready to Join Our Community?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Don't spend your university years on the sidelines. Join a community that will challenge you, support you, and celebrate you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-md"
            >
              {t("joinCommunity")}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:border-white transition-all duration-200"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Teams />
      <CTA />
    </main>
  );
}
