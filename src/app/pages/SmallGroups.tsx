import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { namedTeams } from "../data/teams";

export default function SmallGroups() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Find your community</span>
          <h1 className="font-['DM_Serif_Display'] text-4xl md:text-5xl text-foreground mt-3 mb-5">Choose a small group</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Start with the group that matches your interests. Click a card to learn more, see when they meet, and join the group.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {namedTeams.map((team) => (
            <button
              key={team.id}
              type="button"
              onClick={() => navigate(`/teams/${team.id}`)}
              className="group text-left bg-white border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${team.color}20` }}>
                  {team.icon}
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <h2 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-2">{team.name.replace(" Team", "")}</h2>
              <p className="text-sm font-medium text-primary mb-3">{team.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">{team.description}</p>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2"><Users size={14} /> Welcoming new students</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Click to see meeting details</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary p-8 md:p-10 text-center">
          <h2 className="font-['DM_Serif_Display'] text-3xl text-white mb-3">Not sure which group to choose?</h2>
          <p className="text-white/75 mb-6">Choose the one that interests you most. You can always explore another group later.</p>
          <button onClick={() => navigate("/#small-groups")} className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">Back to homepage</button>
        </div>
      </div>
    </main>
  );
}
