import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, ChevronRight, Quote, Calendar, MapPin, Users } from "lucide-react";
import { teams } from "../data/teams";

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

const events = [
  {
    id: 1,
    title: "Annual Campus Revival",
    date: "July 12, 2025",
    time: "4:00 PM",
    location: "University Main Auditorium",
    category: "Revival",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=380&fit=crop&auto=format",
    spots: 42,
  },
  {
    id: 2,
    title: "Leadership Summit 2025",
    date: "August 3, 2025",
    time: "9:00 AM",
    location: "Student Union Conference Hall",
    category: "Training",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=380&fit=crop&auto=format",
    spots: 18,
  },
  {
    id: 3,
    title: "Worship Night: Open Heavens",
    date: "August 22, 2025",
    time: "7:00 PM",
    location: "Chapel Auditorium",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=380&fit=crop&auto=format",
    spots: 120,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Amara Osei",
    year: "Final Year, Computer Science",
    text: "AUWC ECSF gave me a sense of belonging I never expected to find in university. The Prayer Team completely transformed how I start my mornings — I walk into each day with genuine peace.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format&face",
  },
  {
    id: 2,
    name: "Daniel Mensah",
    year: "Second Year, Medicine",
    text: "Joining the Worship Team was one of the best decisions of my university life. I found friendships that go beyond the campus, and my faith has grown deeper than I thought possible.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format&face",
  },
  {
    id: 3,
    name: "Chisom Adeyemi",
    year: "Third Year, Architecture",
    text: "The Art Team showed me that my creativity was a spiritual gift, not just a hobby. I now create for a greater purpose, and the community here holds me accountable and cheers me on.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format&face",
  },
];

/* ── HERO ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#07131F]">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=1000&fit=crop&auto=format"
          alt="Students gathered in fellowship"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131F]/90 via-[#07131F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131F]/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-white/80 font-medium">AUWC Evangelical Christian Students Fellowship</span>
          </div>

          <h1 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6">
            Grow Together,<br />
            <span className="text-primary italic">Serve Together,</span><br />
            <span className="text-white/90">Shine Together</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-md">
            AUWC ECSF is a vibrant community of university students united by faith, growing in purpose, and dedicated to making a lasting difference on campus and beyond.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Join Our Community
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => document.getElementById("teams")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all duration-200"
            >
              Explore Teams
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
            {[["500+", "Active Members"], ["12", "Ministry Teams"], ["6", "Years of Impact"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white">{num}</div>
                <div className="text-sm text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image card — placeholder area */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&h=875&fit=crop&auto=format"
                alt="Fellowship community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl max-w-[200px]">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex -space-x-2">
                  {["photo-1531746020798-e6953c6e8e04", "photo-1500648767791-00dcc994a43e", "photo-1494790108377-be9c29b29330"].map((id) => (
                    <img key={id} src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-foreground">+480</span>
              </div>
              <p className="text-xs text-muted-foreground">Students already part of something bigger</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const { ref, inView } = useInView();

  const cards = [
    {
      label: "Our Mission",
      icon: "🎯",
      color: "bg-primary/10 text-primary border-primary/20",
      text: "To raise purpose-driven students who are deeply rooted in faith, actively serving their communities, and transforming every environment they enter.",
    },
    {
      label: "Our Vision",
      icon: "🌟",
      color: "bg-accent/10 text-accent border-accent/20",
      text: "To see every student on campus encounter the living God and become a beacon of hope, excellence, and Christlike character in their generation.",
    },
    {
      label: "Core Values",
      icon: "💎",
      color: "bg-[#A78BFA]/10 text-[#6D28D9] border-[#A78BFA]/20",
      values: ["Authentic Faith", "Radical Love", "Servant Leadership", "Creative Excellence", "Community"],
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Who We Are</span>
            <h2 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mt-3 mb-6 leading-tight">
              More than a student group —<br />
              <span className="italic text-primary">a family</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Founded in 2019 with a handful of students who refused to let university life be defined by academic pressure alone, AUWC ECSF has grown into one of the most vibrant student ministries on campus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <div
                key={card.label}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-[box-shadow,transform] duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border text-2xl mb-6 ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-3">{card.label}</h3>
                {"text" in card ? (
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {card.values!.map((v) => (
                      <span key={v} className="text-xs font-medium bg-secondary text-foreground px-3 py-1.5 rounded-full">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 h-52 lg:h-64">
            {[
              "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=400&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&h=400&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop&auto=format",
            ].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-muted">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
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

  return (
    <section id="teams" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Ministry Teams</span>
              <h2 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                Find your place<br />to <span className="italic text-primary">contribute</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
              Every team is a family within the family — a place where your unique gifts are celebrated and sharpened.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, i) => (
              <div
                key={team.id}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1.5 transition-[box-shadow,transform,opacity] duration-300 cursor-pointer`}
                onClick={() => navigate(`/teams/${team.id}`)}
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: team.color + "33" }}
                  >
                    {team.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-2">{team.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{team.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/teams/${team.id}`); }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                  >
                    Learn More <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── EVENTS ── */
function Events() {
  const { ref, inView } = useInView();

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-xl mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{"What's Coming"}</span>
            <h2 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
              Upcoming <span className="italic text-primary">Events</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <div
                key={event.id}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-[box-shadow,transform,opacity] duration-300`}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-4 leading-tight">{event.title}</h3>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="text-primary shrink-0" />
                      {event.date} · {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} className="text-primary shrink-0" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={14} className="text-primary shrink-0" />
                      {event.spots} spots remaining
                    </div>
                  </div>
                  <button className="w-full py-2.5 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-200">
                    Register for Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Student Stories</span>
            <h2 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-background mt-3 leading-tight">
              Life-changing <span className="italic text-primary">testimonies</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                onClick={() => setActive(i)}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} cursor-pointer rounded-2xl p-8 border transition-colors duration-200 ${
                  active === i
                    ? "bg-primary border-primary"
                    : "bg-background/5 border-background/10 hover:bg-background/10"
                }`}
              >
                <Quote size={28} className={`mb-6 ${active === i ? "text-white/40" : "text-primary/40"}`} />
                <p className={`text-base leading-relaxed mb-8 ${active === i ? "text-white" : "text-background/70"}`}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <div className={`font-semibold text-sm ${active === i ? "text-white" : "text-background/90"}`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${active === i ? "text-white/60" : "text-background/40"}`}>
                      {t.year}
                    </div>
                  </div>
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

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} relative rounded-3xl overflow-hidden bg-primary`}
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Ready to be part of<br />something <span className="italic">extraordinary?</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {"Don't spend your university years on the sidelines. Join a community that will challenge you, support you, and celebrate you."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Join Our Community <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => document.getElementById("teams")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-white/60 transition-all duration-200"
              >
                Explore Teams
              </button>
            </div>
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
      <Events />
      <Testimonials />
      <CTA />
    </main>
  );
}
