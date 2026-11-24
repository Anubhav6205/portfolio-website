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
  // Formspree form that emails contact messages to me. Not a secret: it is visible in the page either way.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "xnpdoogk",
} as const;

export type Metric = {
  /** Where the number comes from, shown above it */
  context: string;
  value: number;
  decimals?: number;
  /** Small word before the number, such as "about" */
  qualifier?: string;
  prefix?: string;
  suffix?: string;
  /** Plain-language meaning of the number */
  headline: string;
  /** Shown when the card opens on hover or focus */
  detail: string;
};

export const metrics: Metric[] = [
  {
    context: "RAG schema service · Chubb",
    value: 75,
    qualifier: "about",
    suffix: "%",
    headline: "less manual effort to author product rules",
    detail:
      "Turns plain-English requests into product schemas with Python, FastAPI and Qdrant. Measured per rule against the previous rule configurator, client-reported across 1,000+ rules.",
  },
  {
    context: "Speed-to-Market platform · Chubb",
    value: 15,
    suffix: " days",
    headline: "product launch cycle, down from 9 months",
    detail:
      "Co-delivered the platform and owned its workflow engine, replacing Excel intake with versioned, schema-validated workflows. Measured across 30+ insurance product launches.",
  },
  {
    context: "PIX agent assistant · Chubb",
    value: 10,
    suffix: "+",
    headline: "teams using the multi-agent assistant",
    detail:
      "Led the CrewAI agent architecture. PIX turns policy documents and Excel rule files into product requirements and guides users through Product Designer workflows.",
  },
  {
    context: "Backend delivery · Chubb",
    value: 14,
    headline: "microservices, plus 2 Angular UIs",
    detail: "Spring Boot and Quarkus services on MongoDB, released through Jenkins CI/CD to Docker and Kubernetes.",
  },
  {
    context: "AI Business Hackathon 2026",
    value: 1,
    prefix: "#",
    headline: "of 25 teams",
    detail:
      "Team of four. Co-designed a compliance platform and built its OPA and Rego policy layer for role-based access on LLM outputs.",
  },
  {
    context: "Codebase Explainer · personal",
    value: 0.9,
    decimals: 2,
    headline: "context recall on a 31-question set",
    detail:
      "Multi-hop RAG over the Backstage codebase with LangGraph and hybrid search. Up from 0.69 with retrieval alone, measured with Ragas.",
  },
];
