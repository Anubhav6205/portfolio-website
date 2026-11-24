export type Award = {
  title: string;
  date: string;
  rank?: string;
  detail: string;
  link?: string;
};

export const awards: Award[] = [
  {
    title: "Chubb AI Business Hackathon",
    date: "Jun 2026",
    rank: "1st of 25 teams",
    detail:
      "Team of four. Co-designed a compliance platform and built its backend policy layer with OPA and Rego to enforce role-based access on LLM outputs.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7476110746741915648/",
  },
  {
    title: "Chubb Engineering Excellence Award",
    date: "Oct 2025",
    detail: "For high-quality feature delivery, AI skill adoption and onboarding documentation.",
  },
  {
    title: "Chubb AI Game Development Hackathon",
    date: "May 2025",
    rank: "1st of about 100",
    detail: "Solo entry. Built The Hollowing in Unity with AI-assisted coding and AI-generated audio and video.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7331151840006275072",
  },
  {
    title: "Chubb Diamond Excellence Award",
    date: "Mar 2025",
    detail: "For feature quality, design contributions and efficient solutions.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7305843461381832707",
  },
  {
    title: "Driving Collaboration Award",
    date: "2024",
    rank: "1st of 20 teams",
    detail: "Team award for collaboration and delivery during my internship at Chubb.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7217220201283559427/",
  },
];
