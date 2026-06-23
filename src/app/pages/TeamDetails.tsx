import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Clock, MapPin, CheckCircle, Users } from "lucide-react";
import { teams } from "../data/teams";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function TeamDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, joinTeam, hasJoinedTeam } = useAuth();
  const [justJoined, setJustJoined] = useState(false);

  const team = teams.find((t) => t.id === id);

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="font-['DM_Serif_Display'] text-3xl">Team not found</h2>
        <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const alreadyJoined = hasJoinedTeam(team.id) || justJoined;

  const handleJoin = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    joinTeam(team.id);
    setJustJoined(true);
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Banner */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden bg-foreground">
        <img
          src={team.image}
          alt={team.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: team.color + "33", border: `1px solid ${team.color}40` }}
              >
                {team.icon}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Ministry Team</span>
                <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-white leading-tight">
                  {team.name}
                </h1>
              </div>
            </div>
            <p className="text-white/70 text-lg italic">{team.tagline}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur-sm">
              <Users size={16} /> {team.leaderCount} {team.leaderCount === 1 ? "team leader" : "team leaders"}
            </div>
            {team.leaderEmail && <p className="mt-3 text-sm font-medium text-white/75">Assigned leader: {team.leaderEmail}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="font-['DM_Serif_Display'] text-3xl text-foreground mb-5">About This Team</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{team.fullDescription}</p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="font-['DM_Serif_Display'] text-3xl text-foreground mb-6">What We Do</h2>
              <ul className="space-y-3">
                {team.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="font-['DM_Serif_Display'] text-3xl text-foreground mb-6">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {team.galleryImages.map((src, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden bg-muted ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
                    <img
                      src={src}
                      alt={`${team.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <Users size={18} className="text-primary" />
                <span className="font-semibold text-foreground text-sm">Join this team</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {alreadyJoined
                  ? "You are already a member of this team. Welcome aboard!"
                  : user
                  ? `Hi ${user.name.split(" ")[0]}! Click below to officially join the ${team.name}.`
                  : "Create an account or sign in to join this ministry team and become part of the family."}
              </p>

              {alreadyJoined ? (
                <div className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 rounded-xl px-4 py-3 text-sm font-semibold">
                  <CheckCircle size={16} />
                  You have joined this team
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {user ? "Join This Team" : "Login to Join"}
                </button>
              )}

              {!user && (
                <div className="mt-4 text-center">
                  <span className="text-xs text-muted-foreground">No account? </span>
                  <Link to="/register" className="text-xs font-semibold text-primary hover:underline">
                    Register free
                  </Link>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-5">Meeting Schedule</h3>
              <div className="space-y-4">
                {team.schedule.map((s, i) => (
                  <div key={i} className="p-4 bg-secondary/60 rounded-xl">
                    <div className="flex items-start gap-3 mb-2">
                      <Clock size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{s.day}</div>
                        <div className="text-sm text-muted-foreground">{s.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <MapPin size={13} className="text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{s.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other teams CTA */}
            <div className="bg-secondary/60 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground mb-3">Interested in other teams?</p>
              <button
                onClick={() => { navigate("/"); setTimeout(() => document.getElementById("teams")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Browse all teams →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
