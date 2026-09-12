import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { teams } from "../data/teams";
import { useAuth } from "../context/AuthContext";

export default function MySmallGroup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const joinedTeams = teams.filter((team) => user?.joinedTeams.includes(team.id));

  if (!user) {
    return <main className="min-h-screen bg-background pt-32 pb-20 text-center px-6"><h1 className="font-['DM_Serif_Display'] text-4xl text-foreground mb-4">Sign in to view your group</h1><p className="text-muted-foreground mb-7">Your small group will appear here after you join.</p><Link to="/login" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold">Sign in <ArrowRight size={17} /></Link></main>;
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <span className="text-sm font-semibold text-primary uppercase tracking-widest">Welcome back, {user.name.split(" ")[0]}</span>
        <h1 className="font-['DM_Serif_Display'] text-4xl md:text-5xl text-foreground mt-3 mb-4">My small group</h1>
        <p className="text-lg text-muted-foreground mb-10">This is your community. Find your group details and stay connected.</p>

        {joinedTeams.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center"><h2 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-3">You have not joined a group yet</h2><p className="text-muted-foreground mb-6">Choose a group and start building meaningful community.</p><button onClick={() => navigate("/small-groups")} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold">Find my group</button></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {joinedTeams.map((team) => <button key={team.id} onClick={() => navigate(`/teams/${team.id}`)} className="group text-left rounded-2xl border border-border bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all"><div className="flex items-start justify-between mb-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${team.color}20` }}>{team.icon}</div><ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" /></div><h2 className="font-['DM_Serif_Display'] text-3xl text-foreground mb-2">{team.name}</h2><p className="text-primary font-medium mb-6">{team.tagline}</p><div className="space-y-3 text-sm text-muted-foreground"><p className="flex items-center gap-2"><Users size={16} className="text-primary" /> You are a member of this group</p><p className="flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> {team.schedule[0]?.day}, {team.schedule[0]?.time}</p><p className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {team.schedule[0]?.location}</p></div><p className="mt-7 text-sm font-semibold text-primary">View group details <ArrowRight className="inline ml-1" size={15} /></p></button>)}
          </div>
        )}
      </div>
    </main>
  );
}
