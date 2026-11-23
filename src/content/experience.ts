export type Role = {
  title: string;
  org: string;
  period: string;
  start: string;
  kind: "work" | "education" | "next";
  summary?: string;
  bullets: string[];
  tags?: string[];
};

export const timeline: Role[] = [
  {
    title: "Senior Software Engineer",
    org: "Chubb",
    period: "Jun 2026 to present",
    start: "2026",
    kind: "work",
    summary: "Generative AI services for insurance product configuration.",
    bullets: [
      "Built a Python RAG service with FastAPI and Qdrant that turns plain-English requests into product schemas, cutting manual rule authoring by about 75%.",
      "Added intent classification that routes each request to the right Claude model tier, lowering token spend across internal agents.",
      "Built a standalone microservice that consumes MongoDB change events through Kafka and projects coverages, rules and ratings into Neo4j, so the assistant can trace rule-change impact to full depth.",
      "Built semantic requirement retrieval on MongoDB Atlas with Voyage embeddings, combining vector, fuzzy and n-gram search behind a single query path.",
    ],
    tags: ["Python", "FastAPI", "Qdrant", "CrewAI", "Kafka", "Neo4j", "MongoDB Atlas"],
  },
  {
    title: "Software Development Engineer",
    org: "Chubb",
    period: "Jun 2024 to Jun 2026",
    start: "2024",
    kind: "work",
    summary: "Full-stack platform work that grew into the team's AI layer.",
    bullets: [
      "Co-delivered the Speed-to-Market platform and owned its core workflow engine, replacing error-prone Excel intake with versioned, schema-validated workflows and cutting full product launch cycles from 9 months to 15 days across 30+ products.",
      "Led the agent architecture for PIX, a production CrewAI multi-agent assistant used by 10+ teams to turn policy documents and Excel rule files into product requirements.",
      "Built a Model Context Protocol (MCP) server in Python with read and write tools across internal services, secured with TLS ingress and a project token, so users can create product requirements from the Claude app and CLI.",
      "Started the team's AI engineering layer for Claude Code, with agent-readable architecture docs and role-based agents, making the team one of the 3 fastest AI adopters out of about 40 teams in the tower.",
      "Kept unit test coverage above 90% with agent-generated Jest, JUnit and Mockito tests that a tester agent runs and verifies after each generation.",
      "Delivered 14 Spring Boot and Quarkus microservices and 2 Angular UIs on MongoDB, released through Jenkins CI/CD to Docker and Kubernetes.",
      "Resolved a cross-cluster CrashLoopBackOff on AWS EKS in production by tracing it to a vulnerable Docker image dependency, without DevOps escalation.",
      "Set code review standards, onboarded 11 new joiners and interviewed candidates on 2 campus hiring panels.",
    ],
    tags: ["CrewAI", "LangChain", "MCP", "Java", "Spring Boot", "Quarkus", "Angular", "NgRx", "Nx", "Kubernetes", "Jenkins"],
  },
  {
    title: "Software Development Engineer Intern",
    org: "Chubb",
    period: "Sep 2023 to Jun 2024",
    start: "2023",
    kind: "work",
    bullets: [
      "Developed a workforce segmentation web app that maps 10k+ employees across towers, teams, squads and chapters, and won senior leadership approval for productization.",
    ],
    tags: ["Angular", "Spring Boot", "MongoDB"],
  },
  {
    title: "B.Tech, Computer Science and Engineering",
    org: "Kalinga Institute of Industrial Technology",
    period: "Aug 2020 to Sep 2024",
    start: "2020",
    kind: "education",
    summary: "CGPA 9.17 out of 10. Bhubaneswar, India.",
    bullets: [],
  },
];

export const nextStep: Role = {
  title: "Next",
  org: "AI Engineer or Applied AI role",
  period: "Open now",
  start: "Next",
  kind: "next",
  summary:
    "Looking for a team that ships agents, retrieval and evaluation to real users. Based in Hyderabad and open to hybrid or remote work.",
  bullets: [],
};
