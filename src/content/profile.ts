export const profile = {
  name: "Anubhav Gupta",
  initials: "AG",
  title: "Senior Software Engineer",
  employer: "Chubb",
  location: "Hyderabad, India",
  email: "anubhavgupta6205@gmail.com",
  siteUrl: "https://anubhav-gupta.vercel.app",
  resume: "/Anubhav_Gupta_Resume.pdf",
  status: "Open to AI Engineer roles",
  headline: {
    before: "I build AI systems that",
    accent: "hold up",
    after: "in production.",
  },
  summary:
    "Senior Software Engineer at Chubb building Python AI systems and Java backend services for insurance product workflows. Most of my recent work is multi-agent assistants, retrieval pipelines and the platforms they run on.",
  description:
    "Anubhav Gupta is a Senior Software Engineer at Chubb in Hyderabad building Python AI systems, RAG pipelines, multi-agent assistants and Java backend services.",
  about: [
    "At Chubb I work on the systems behind insurance product launches. That means a RAG service that turns plain-English rules into product schemas, a multi-agent assistant used by more than ten teams, and the Spring Boot and Angular platform underneath them.",
    "I joined Chubb as an intern in 2023, and most of my first years were Java, Spring Boot and Angular work. Since mid-2026 most of my work has been agents and retrieval. Outside work I build projects that test how well those ideas hold up, such as a multi-hop RAG assistant with a 31-question evaluation set.",
  ],
  socials: {
    github: "https://github.com/Anubhav6205",
    linkedin: "https://www.linkedin.com/in/anubhavgupta8",
    hashnode: "https://anubhavinsights.hashnode.dev",
  },
  repo: "https://github.com/Anubhav6205/portfolio-website",
} as const;

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  kicker?: string;
  suffix?: string;
  label: string;
  note: string;
};

export const metrics: Metric[] = [
  { value: 75, kicker: "about", suffix: "%", label: "less manual rule authoring", note: "RAG service for product schemas" },
  { value: 15, kicker: "from 9 months to", suffix: " days", label: "product launch cycle", note: "across 30+ insurance products" },
  { value: 10, suffix: "+", label: "teams using the agent assistant", note: "production CrewAI system" },
  { value: 14, label: "microservices delivered", note: "plus 2 Angular UIs" },
  { value: 1, prefix: "#", label: "of 25 teams", note: "Chubb AI Business Hackathon 2026" },
  { value: 0.9, decimals: 2, label: "context recall", note: "multi-hop RAG capstone, Ragas" },
];
