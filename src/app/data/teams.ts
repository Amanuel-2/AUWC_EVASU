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
}

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
    image: "../assets/images/teams/love-sharing/photo_2026-06-23_14-57-21.jpg",
    galleryImages: [
      "../assets/images/teams/love-sharing/photo_2026-06-23_14-57-21.jpg",
      "../assets/images/teams/love-sharing/photo_2026-06-23_14-57-21.jpg",
      "../assets/images/teams/love-sharing/photo_2026-06-23_14-57-21.jpg",
      "../assets/images/teams/love-sharing/photo_2026-06-23_14-57-21.jpg",
    ],
    icon: "❤️",
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
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop&auto=format",
    galleryImages: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    ],
    icon: "🎨",
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
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop&auto=format",
    galleryImages: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&auto=format",
    ],
    icon: "🎵",
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
    image: "/images/choir.jpg",
    galleryImages: [],
    icon: "🎤"
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
    image: "https://images.unsplash.com/photo-1574717024453-354050e0ce84?w=800&h=500&fit=crop&auto=format",
    galleryImages: [
      "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop&auto=format",
    ],
    icon: "📷",
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
  },
];
