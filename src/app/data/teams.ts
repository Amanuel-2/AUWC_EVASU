export interface Team {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  schedule: { day: string; time: string; location: string }[];
  color: string;
  image: string;
  galleryImages: string[];
  icon: string;
  leaderCount: number;
  leaderEmail?: string;
}

import artTeamImage from "../../assets/teams/art/photo_2026-06-23_14-54-08.jpg";
import choirImage1 from "../../assets/teams/choir/IMG_3224.jpg";
import choirImage2 from "../../assets/teams/choir/IMG_3231.jpg";
import choirImage3 from "../../assets/teams/choir/IMG_3247.jpg";
import loveSharingImage1 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-02.jpg";
import loveSharingImage2 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-11.jpg";
import loveSharingImage3 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-21.jpg";
import loveSharingImage4 from "../../assets/teams/love-sharing/photo_2026-06-23_14-57-29.jpg";
import loveSharingImage5 from "../../assets/teams/love-sharing/photo_2026-06-23_15-01-32.jpg";
import loveSharingImage6 from "../../assets/teams/love-sharing/photo_2026-06-23_15-01-44.jpg";
import mediaTeamImage from "../../assets/teams/media/photo_2026-06-23_20-48-02.jpg";
import worshipImage1 from "../../assets/teams/worship/20260510_125332.jpg";
import worshipImage2 from "../../assets/teams/worship/20260510_125349.jpg";
import worshipImage3 from "../../assets/teams/worship/IMG_20260516_153310_133.jpg";

export const teams: Team[] = [
  {
    id: "love-sharing",
    name: "Love Sharing Team",
    tagline: "Extending grace beyond our walls",
    description: "We reach out to the campus community with practical acts of kindness, food drives, and care packages for students in need.",
    fullDescription: "The Love Sharing Team is the hands and feet of our fellowship — organized to serve the wider campus community with tangible expressions of love. From surprise care packages during exam season to partnering with local shelters, we believe love is best spoken through action.",
    responsibilities: [
      "Organize monthly campus outreach events",
      "Coordinate care package distributions during exam seasons",
      "Partner with local NGOs and shelters",
      "Run weekly encouragement drives",
      "Host community dinners for international students",
    ],
    schedule: [
      { day: "Every Saturday", time: "9:00 AM", location: "Student Union Hall B" },
      { day: "Monthly Planning", time: "Fridays 6:00 PM", location: "Fellowship Building, Room 4" },
    ],
    color: "#E8856A",
    image: loveSharingImage3,
    galleryImages: [
      loveSharingImage3,
      loveSharingImage1,
      loveSharingImage2,
      loveSharingImage4,
      loveSharingImage5,
      loveSharingImage6,
    ],
    icon: "❤️",
    leaderCount: 4,
  },
  {
    id: "art",
    name: "Art Team",
    tagline: "Where creativity meets faith",
    description: "A creative space for painters, illustrators, designers, and storytellers to use their gifts for the glory of God.",
    fullDescription: "The Art Team is a vibrant community of creatives who believe that beauty is one of the most compelling expressions of the divine. Through exhibitions, collaborative murals, illustrated devotionals, and set design for fellowship events, we channel our creative gifts toward meaningful expression.",
    responsibilities: [
      "Design visual assets for fellowship events and communications",
      "Organize termly art exhibitions open to the campus",
      "Illustrate devotional booklets and newsletters",
      "Create stage and set decor for major events",
      "Run creative workshops for fellowship members",
    ],
    schedule: [
      { day: "Every Wednesday", time: "4:00 PM – 7:00 PM", location: "Arts Faculty Studio, Room 12" },
      { day: "Exhibition Planning", time: "Bi-weekly Mondays 5:00 PM", location: "Fellowship Building, Room 2" },
    ],
    color: "#A78BFA",
    image: artTeamImage,
    galleryImages: [
      artTeamImage,
    ],
    icon: "🎨",
    leaderCount: 3,
  },
  {
    id: "worship",
    name: "Worship Team",
    tagline: "Leading hearts to the throne",
    description: "Musicians, singers, and sound technicians working together to create authentic, spirit-filled worship experiences every week.",
    fullDescription: "The Worship Team is the heartbeat of our fellowship gatherings. Comprising instrumentalists, vocalists, and audio engineers, we craft worship environments that invite every student into a genuine encounter with God. We believe worship is both a gift and a discipline.",
    responsibilities: [
      "Lead worship at weekly fellowship meetings and special services",
      "Rehearse bi-weekly to maintain musical excellence",
      "Mentor younger musicians and emerging worship leaders",
      "Select and arrange song sets for different seasons",
      "Collaborate with the Media Team for live-stream audio",
    ],
    schedule: [
      { day: "Every Tuesday", time: "6:00 PM – 9:00 PM", location: "Chapel Auditorium" },
      { day: "Sunday Service", time: "8:00 AM Call Time", location: "Main Auditorium" },
    ],
    color: "#FBBF24",
    image: worshipImage2,
    galleryImages: [
      worshipImage2,
      worshipImage1,
      worshipImage3,
    ],
    icon: "🎵",
    leaderCount: 5,
  },
  {
    id: "choir",
    name: "Choir Team",
    tagline: "Lifted voices in harmony",
    description: "Singers and vocalists who lead worship through powerful choral arrangements.",
    fullDescription: "The Choir Team blends diverse voices to create uplifting worship experiences. From traditional hymns to contemporary gospel, they craft arrangements that inspire and unite the congregation.",
    responsibilities: ["Arrange choral pieces for services", "Practice weekly rehearsals", "Collaborate with worship band", "Lead special musical events", "Mentor new singers"],
    schedule: [{ day: "Every Friday", time: "6:00 PM – 8:30 PM", location: "Chapel Choir Room" }],
    color: "#D946EF",
    image: choirImage1,
    galleryImages: [choirImage1, choirImage2, choirImage3],
    icon: "🎤",
    leaderCount: 4,
  },
  {
    id: "media",
    name: "Media Team",
    tagline: "Capturing and amplifying the story",
    description: "Photography, videography, graphic design, and social media — documenting our fellowship's journey and sharing it with the world.",
    fullDescription: "The Media Team is the storytelling engine of our fellowship. From live-streaming Sunday services to designing weekly announcement graphics, we ensure our community's story is told well — and told widely. We are constantly learning, creating, and pushing the boundaries of what digital ministry looks like.",
    responsibilities: [
      "Live-stream and record all major fellowship events",
      "Manage social media accounts and content calendar",
      "Design weekly bulletins, posters, and digital assets",
      "Photograph fellowship programs and activities",
      "Produce short-form video content for outreach",
    ],
    schedule: [
      { day: "Every Thursday", time: "5:00 PM – 8:00 PM", location: "Media Suite, ICT Building" },
      { day: "Content Review", time: "Mondays 4:00 PM", location: "Online (Google Meet)" },
    ],
    color: "#34D399",
    image: mediaTeamImage,
    galleryImages: [
      mediaTeamImage,
    ],
    icon: "📷",
    leaderCount: 3,
  },

  {
    id: "fund",
    name: "Fund Team",
    tagline: "Faithful stewardship for shared mission",
    description: "Students who coordinate fundraising, giving records, and financial support for fellowship activities and outreach projects.",
    fullDescription: "The Fund Team helps the fellowship steward resources with care and transparency. They coordinate contribution drives, track support for programs, prepare simple reports for leaders, and make sure ministry plans have practical financial backing.",
    responsibilities: [
      "Coordinate fellowship fundraising campaigns",
      "Track pledged and received support for activities",
      "Prepare simple finance updates for team leaders",
      "Support outreach and event budgeting",
      "Encourage a culture of cheerful and accountable giving",
    ],
    schedule: [
      { day: "Every Monday", time: "5:00 PM", location: "Fellowship Office" },
      { day: "Monthly Review", time: "Saturdays 11:00 AM", location: "Student Centre Room 3" },
    ],
    color: "#14B8A6",
    image: loveSharingImage5,
    galleryImages: [
      loveSharingImage5,
      loveSharingImage6,
      mediaTeamImage,
    ],
    icon: "💰",
    leaderCount: 3,
  },

  {
    id: "small-group-1",
    name: "Small Group 1",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader1@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 1 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader1@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 1" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader1@gmail.com",
  },
  {
    id: "small-group-2",
    name: "Small Group 2",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader2@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 2 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader2@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 2" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader2@gmail.com",
  },
  {
    id: "small-group-3",
    name: "Small Group 3",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader3@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 3 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader3@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 3" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader3@gmail.com",
  },
  {
    id: "small-group-4",
    name: "Small Group 4",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader4@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 4 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader4@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 4" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader4@gmail.com",
  },
  {
    id: "small-group-5",
    name: "Small Group 5",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader5@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 5 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader5@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 5" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader5@gmail.com",
  },
  {
    id: "small-group-6",
    name: "Small Group 6",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader6@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 6 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader6@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 6" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader6@gmail.com",
  },
  {
    id: "small-group-7",
    name: "Small Group 7",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader7@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 7 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader7@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 7" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader7@gmail.com",
  },
  {
    id: "small-group-8",
    name: "Small Group 8",
    tagline: "Close community, steady discipleship",
    description: "A student small group led by leader8@gmail.com for Bible study, prayer, attendance follow-up, and weekly encouragement.",
    fullDescription: "Small Group 8 gives students a smaller circle where they can be known, prayed for, and guided. This group has exactly one assigned leader, leader8@gmail.com, who can manage only this group's members, attendance, schedule, and activity records.",
    responsibilities: [
      "Lead weekly small group Bible studies",
      "Follow up with assigned members and new students",
      "Track this group’s attendance and participation",
      "Pray with members and share care needs with coordinators",
      "Help students build strong fellowship relationships",
    ],
    schedule: [
      { day: "Every Wednesday", time: "6:00 PM", location: "Small Group Room 8" },
      { day: "Leader Check-in", time: "Sundays 1:00 PM", location: "Fellowship Office" },
    ],
    color: "#8B5CF6",
    image: worshipImage1,
    galleryImages: [
      worshipImage1,
      loveSharingImage2,
      loveSharingImage4,
    ],
    icon: "👥",
    leaderCount: 1,
    leaderEmail: "leader8@gmail.com",
  },
  {
    id: "prayer",
    name: "Prayer Team",
    tagline: "Interceding for campus and beyond",
    description: "Dedicated intercessors who hold the spiritual atmosphere of our campus through consistent, fervent, and faith-filled prayer.",
    fullDescription: "The Prayer Team is the spiritual backbone of our fellowship. We believe that everything we do is sustained by a foundation of prayer. From early morning prayer walks across campus to all-night intercession vigils, our team is committed to cultivating a culture of prayer in every student.",
    responsibilities: [
      "Organize daily morning prayer sessions on campus",
      "Coordinate monthly all-night prayer vigils",
      "Lead intercession slots at all fellowship programs",
      "Compile and follow up on prayer requests from members",
      "Run termly prayer and fasting retreats",
    ],
    schedule: [
      { day: "Every Morning", time: "6:00 AM – 7:00 AM", location: "Chapel Garden" },
      { day: "Friday Prayer Night", time: "10:00 PM – Midnight", location: "Chapel Auditorium" },
    ],
    color: "#60A5FA",
    image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=500&fit=crop&auto=format",
    galleryImages: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=400&fit=crop&auto=format",
    ],
    icon: "🙏",
    leaderCount: 6,
  },
  {
    id: "evangelism",
    name: "Evangelism Team",
    tagline: "Every student, every faculty",
    description: "Bold and compassionate campus missionaries who share the gospel creatively and courageously across every department.",
    fullDescription: "The Evangelism Team carries the heart of God for every student on campus. Through open-air meetings, door-to-door visits in student hostels, one-on-one gospel conversations, and creative outreaches, we are determined that no student finishes their university years without hearing the good news.",
    responsibilities: [
      "Conduct weekly hostel-to-hostel outreach visits",
      "Organize open-air gospel campaigns on campus",
      "Train new believers in discipleship and growth",
      "Run semesterly evangelism training workshops",
      "Coordinate outreach to new students during orientation week",
    ],
    schedule: [
      { day: "Every Sunday", time: "2:00 PM – 5:00 PM", location: "Campus Student Centre" },
      { day: "Training Sessions", time: "Wednesdays 5:00 PM", location: "Fellowship Building, Room 1" },
    ],
    color: "#F97316",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop&auto=format",
    galleryImages: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1556484687-30636164638b?w=600&h=400&fit=crop&auto=format",
    ],
    icon: "✝️",
    leaderCount: 5,
  },
];
