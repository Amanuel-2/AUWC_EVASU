import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Language = "am" | "en";

const translations = {
  en: {
    home: "Home", about: "About", teams: "Teams", events: "Events", contact: "Contact",
    dashboard: "Dashboard", login: "Login", register: "Register", signOut: "Sign out", logout: "Logout",
    language: "Language", switchLanguage: "English", backHome: "Back to Home", goHome: "Go Home",
    pageNotFound: "Page not found", missingPage: "The page you are looking for does not exist.",
    welcomeBack: "Welcome back", signInSubtitle: "Sign in to your AUWC ECSF account", demoAccounts: "Demo accounts",
    adminDemo: "Admin: admin@auwcec.edu / any password", leaderDemo: "Team Leader: leader@auwcec.edu / any password",
    email: "Email address", universityEmail: "University email", password: "Password", forgot: "Forgot password?",
    signIn: "Sign In", signingIn: "Signing in...", newTo: "New to AUWC?", createAccount: "Create an account",
    createTitle: "Create your account", joinFree: "Join AUWC ECSF — it's completely free", fullName: "Full name",
    creating: "Creating account...", createButton: "Create Account", already: "Already have an account?",
    terms: "By registering, you agree to our Terms of Service and Privacy Policy.",
    perkTeams: "Join multiple ministry teams", perkEvents: "Get updates on all fellowship events", perkStudents: "Connect with 500+ students", perkResources: "Access members-only resources",
    heroBadge: "AUWC Evangelical Christian Students Fellowship", grow: "Grow Together,", serve: "Serve Together,", shine: "Shine Together",
    heroText: "AUWC ECSF is a vibrant community of university students united by faith, growing in purpose, and dedicated to making a lasting difference on campus and beyond.",
    joinCommunity: "Join Our Community", exploreTeams: "Explore Teams", activeMembers: "Active Members", ministryTeams: "Ministry Teams", yearsImpact: "Years of Impact",
    whoWeAre: "Who We Are", familyTitle: "More than a student group — a family",
    teamsTitle: "Find your place to contribute", learnMore: "Learn More", upcomingEvents: "Upcoming Events", registerEvent: "Register for Event",
    leaderWorkspace: "Leader Workspace", teamLeader: "Team Leader", assignedTeam: "Assigned team", teamMembers: "Team Members", attendance: "Attendance", meetingSchedule: "Meeting Schedule", profile: "Profile",
    adminDashboard: "Admin Dashboard", publicSite: "Public site", adminScope: "Admin scope",
  },
  am: {
    home: "መነሻ", about: "ስለ እኛ", teams: "ቡድኖች", events: "ዝግጅቶች", contact: "አግኙን",
    dashboard: "ዳሽቦርድ", login: "ግባ", register: "ተመዝገብ", signOut: "ውጣ", logout: "ውጣ",
    language: "ቋንቋ", switchLanguage: "English", backHome: "ወደ መነሻ ተመለስ", goHome: "ወደ መነሻ",
    pageNotFound: "ገጹ አልተገኘም", missingPage: "የሚፈልጉት ገጽ አልተገኘም።",
    welcomeBack: "እንኳን ተመለሱ", signInSubtitle: "ወደ AUWC ECSF መለያዎ ይግቡ", demoAccounts: "የሙከራ መለያዎች",
    adminDemo: "አድሚን፦ admin@auwcec.edu / ማንኛውም የይለፍ ቃል", leaderDemo: "የቡድን መሪ፦ leader@auwcec.edu / ማንኛውም የይለፍ ቃል",
    email: "ኢሜይል", universityEmail: "የዩኒቨርሲቲ ኢሜይል", password: "የይለፍ ቃል", forgot: "የይለፍ ቃል ረሱ?",
    signIn: "ግባ", signingIn: "በመግባት ላይ...", newTo: "በ AUWC አዲስ ነዎት?", createAccount: "መለያ ፍጠር",
    createTitle: "መለያዎን ይፍጠሩ", joinFree: "AUWC ECSFን በነፃ ይቀላቀሉ", fullName: "ሙሉ ስም",
    creating: "መለያ በመፍጠር ላይ...", createButton: "መለያ ፍጠር", already: "ከዚህ በፊት መለያ አለዎት?",
    terms: "በመመዝገብ የአገልግሎት ውሎቻችንን እና የግላዊነት ፖሊሲያችንን ተቀብለዋል።",
    perkTeams: "በብዙ የአገልግሎት ቡድኖች ይቀላቀሉ", perkEvents: "የህብረቱን ዝግጅቶች ዜና ያግኙ", perkStudents: "ከ500+ ተማሪዎች ጋር ይገናኙ", perkResources: "የአባላት ብቻ ሀብቶችን ያግኙ",
    heroBadge: "AUWC የወንጌላዊ ክርስቲያን ተማሪዎች ህብረት", grow: "አብረን እንደግ፣", serve: "አብረን እናገልግል፣", shine: "አብረን እንብራ",
    heroText: "AUWC ECSF በእምነት የተባበሩ፣ በዓላማ የሚያድጉ እና በካምፓስ ላይ ተጽዕኖ ለማሳደር የሚሰሩ የዩኒቨርሲቲ ተማሪዎች ማህበረሰብ ነው።",
    joinCommunity: "ማህበረሰቡን ይቀላቀሉ", exploreTeams: "ቡድኖችን ይመልከቱ", activeMembers: "ንቁ አባላት", ministryTeams: "የአገልግሎት ቡድኖች", yearsImpact: "የተጽዕኖ ዓመታት",
    whoWeAre: "ማን ነን", familyTitle: "ከተማሪ ቡድን በላይ — ቤተሰብ",
    teamsTitle: "የሚያገለግሉበትን ቦታ ያግኙ", learnMore: "ተጨማሪ ይወቁ", upcomingEvents: "የሚመጡ ዝግጅቶች", registerEvent: "ለዝግጅት ይመዝገቡ",
    leaderWorkspace: "የመሪ የስራ ቦታ", teamLeader: "የቡድን መሪ", assignedTeam: "የተመደበ ቡድን", teamMembers: "የቡድን አባላት", attendance: "ተገኝነት", meetingSchedule: "የስብሰባ መርሐግብር", profile: "መገለጫ",
    adminDashboard: "የአድሚን ዳሽቦርድ", publicSite: "የሕዝብ ገጽ", adminScope: "የአድሚን ወሰን",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

const LanguageContext = createContext<null | { language: Language; toggleLanguage: () => void; t: (key: TranslationKey) => string }>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("auwcec_language");
    return saved === "en" || saved === "am" ? saved : "am";
  });

  useEffect(() => {
    localStorage.setItem("auwcec_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    toggleLanguage: () => setLanguage((current) => current === "am" ? "en" : "am"),
    t: (key: TranslationKey) => translations[language][key] ?? translations.en[key],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
