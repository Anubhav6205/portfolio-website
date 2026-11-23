export type Category = "ai" | "platform" | "fullstack" | "games";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI and agents" },
  { id: "platform", label: "Platform and DevOps" },
  { id: "fullstack", label: "Full stack" },
  { id: "games", label: "Games" },
];

export type CaseStudy = {
  tagline: string;
  problem: string[];
  diagram: "rag" | "newsroom" | "cicd";
  diagramCaption: string;
  approach: { title: string; body: string }[];
  decisions: { title: string; body: string }[];
  results: { value: string; label: string }[];
  /** Index of the result shown on the home page card. */
  lead?: number;
  resultsNote: string;
  limitations: string[];
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: Category[];
  blurb: string;
  stack: string[];
  repo: string;
  badge?: string;
  caseStudy?: CaseStudy;
};

const gh = (name: string) => `https://github.com/Anubhav6205/${name}`;

export const projects: Project[] = [
  {
    slug: "codebase-explainer-rag",
    title: "Codebase Explainer",
    year: "2026",
    category: ["ai"],
    badge: "Capstone",
    blurb:
      "A multi-hop RAG assistant that answers architecture questions about the Backstage codebase with cited sources, and is measured on a 31-question golden set.",
    stack: ["LangGraph", "LangChain", "Qdrant", "Voyage", "GPT-4.1-mini", "Ragas", "FastAPI"],
    repo: gh("codebase-explainer-rag"),
    caseStudy: {
      tagline: "Retrieval as part of the reasoning loop, not a single lookup.",
      problem: [
        "Questions such as \"how does authentication work in this service?\" are rarely answered by one file. The answer is spread across a README, a config module, middleware and a utility several folders away.",
        "A plain RAG chatbot retrieves once and answers from an incomplete picture, and the answer still sounds confident. I wanted a system that notices when its evidence is thin, searches again, cites every claim and is measured honestly.",
      ],
      diagram: "rag",
      diagramCaption: "The LangGraph flow. Coverage and citation checks can loop back before a human approves the answer.",
      approach: [
        {
          title: "Decompose",
          body: "The question is split into search queries, with a checklist of the evidence the answer needs.",
        },
        {
          title: "Hybrid search",
          body: "Four Qdrant collections hold dense and sparse vectors for code and for docs. Voyage voyage-code-3 embeddings and BM25 results are fused with reciprocal rank fusion and reranked with Voyage rerank-2.",
        },
        {
          title: "Coverage check",
          body: "A node decides whether the gathered chunks cover the checklist. If not, the graph runs another hop, up to three, and stops early when a hop adds nothing new.",
        },
        {
          title: "Answer and cite",
          body: "GPT-4.1-mini writes the answer, then a citation check confirms each claim is backed by a retrieved chunk before a human verification step approves it.",
        },
      ],
      decisions: [
        {
          title: "Separate code and docs collections",
          body: "Code and prose behave differently under embeddings, so each lives in its own collections, with dense and sparse vectors for both.",
        },
        {
          title: "A fixed golden set",
          body: "The 31 evaluation questions, including 10 that the codebase cannot answer, give every change the same bar to clear.",
        },
        {
          title: "Trace everything",
          body: "Every step is traced with Phoenix and LangSmith, so each hop and check can be inspected when an answer goes wrong.",
        },
      ],
      results: [
        { value: "0.98", label: "context precision, retrieval baseline" },
        { value: "0.69", label: "context recall, retrieval baseline" },
        { value: "0.90", label: "context recall, full pipeline" },
        { value: "0.82+", label: "answer correctness, full pipeline" },
      ],
      lead: 2,
      resultsNote:
        "Measured with Ragas on a 31-question golden set (21 answerable, 10 adversarial unanswerable). Answers and citations are also scored with an LLM judge, and a false-confidence rate tracks how often the system answers a question it should refuse.",
      limitations: [
        "Abstaining on unanswerable questions is the hardest part and the main focus of the next iteration.",
        "The evaluation workflow calls paid APIs, so it runs on manual trigger rather than on every push.",
        "Setup has not been re-verified on a clean machine.",
      ],
    },
  },
  {
    slug: "langgraph-multi-agent-newsroom",
    title: "Multi-Agent Newsroom",
    year: "2026",
    category: ["ai"],
    blurb:
      "A LangGraph supervisor that routes research, writing and editing between agents, with a guardrail up front, corrective RAG and a human review step.",
    stack: ["LangGraph", "LangChain", "OpenAI", "Chroma", "Tavily", "FastAPI", "Docker"],
    repo: gh("langgraph-multi-agent-newsroom"),
    caseStudy: {
      tagline: "A small team of agents with one editor in charge.",
      problem: [
        "Single-prompt writing assistants mix research, drafting and editing into one pass, so mistakes in the research quietly flow into the final draft.",
        "I built this to learn how a supervisor pattern behaves in practice: how to route between specialist agents, when to send work back, and where a human should step in.",
      ],
      diagram: "newsroom",
      diagramCaption: "The outer graph. The supervisor routes work and can send drafts back for another pass.",
      approach: [
        {
          title: "Guardrail first",
          body: "Every request is screened for prompt-extraction attempts, personal-data requests and off-topic input before any other agent runs.",
        },
        {
          title: "Supervisor routing",
          body: "One node decides whether the next step is research, writing, editing or finishing, based on the shared state.",
        },
        {
          title: "Corrective RAG researcher",
          body: "The researcher queries a local Chroma knowledge base, grades what comes back, rewrites the query if the results are irrelevant and falls back to Tavily web search.",
        },
        {
          title: "Review and serve",
          body: "An editor can send drafts back for revision, and a human verification step approves the result. FastAPI serves both a normal and a streaming endpoint.",
        },
      ],
      decisions: [
        {
          title: "Grade before answering",
          body: "Letting the researcher judge its own retrieval and retry with a rewritten query gives a weak search a second chance before the writer ever sees it.",
        },
        {
          title: "Guardrail as its own node",
          body: "Safety checks run in a dedicated node before any other agent, which keeps the other prompts focused on their own job.",
        },
        {
          title: "A streaming endpoint",
          body: "Long multi-agent runs feel slow without feedback, so the API also offers an endpoint that streams tokens as the writer works.",
        },
      ],
      results: [
        { value: "5", label: "specialist nodes behind one supervisor" },
        { value: "2", label: "API modes, standard and streaming" },
      ],
      resultsNote: "A working prototype built to learn the supervisor pattern. It has no formal evaluation yet.",
      limitations: [
        "Checkpointing is in memory, so sessions are lost on restart.",
        "No automated tests yet, and dependencies are not version-pinned.",
      ],
    },
  },
  {
    slug: "cicd-to-eks-with-monitoring",
    title: "DevSecOps Pipeline to EKS",
    year: "2025",
    category: ["platform"],
    blurb:
      "A Jenkins pipeline with quality gates and dependency and image scanning that deploys to Amazon EKS, with Terraform-provisioned Prometheus and Grafana monitoring.",
    stack: ["Jenkins", "SonarQube", "Trivy", "OWASP Dependency-Check", "Terraform", "AWS EKS", "Prometheus", "Grafana"],
    repo: gh("cicd-to-eks-with-monitoring"),
    caseStudy: {
      tagline: "Every build scanned before it reaches the cluster.",
      problem: [
        "Shipping a web app to Kubernetes is easy. Shipping it with confidence that the code, its dependencies and its container image are clean, and knowing when it goes down, takes a proper pipeline.",
        "The sample app is a streaming-site UI that calls the TMDB API. It is only the workload. The project is about the delivery and monitoring around it.",
      ],
      diagram: "cicd",
      diagramCaption: "From commit to cluster. Each scan stage can fail the build before an image is pushed.",
      approach: [
        {
          title: "Quality gate",
          body: "SonarQube runs static analysis and blocks the build when the quality gate fails.",
        },
        {
          title: "Dependency and image scans",
          body: "OWASP Dependency-Check scans third-party packages, and Trivy scans both the filesystem and the built Docker image.",
        },
        {
          title: "Deploy to EKS",
          body: "The image is pushed to Docker Hub and rolled out to Amazon EKS as a two-replica deployment behind a LoadBalancer service, with rolling updates for safe rollbacks.",
        },
        {
          title: "Monitor",
          body: "Terraform provisions an EC2 monitoring server running Prometheus with Blackbox Exporter probes and Grafana dashboards, and Jenkins emails the result of every build.",
        },
      ],
      decisions: [
        {
          title: "Measure the baseline first",
          body: "I ran a manual scan before building the pipeline, so the improvement could be compared on the same codebase rather than guessed.",
        },
        {
          title: "Probe from outside",
          body: "Blackbox Exporter checks the app the way a user would, over HTTP and TCP, instead of trusting that a running pod means a working site.",
        },
        {
          title: "Infrastructure as code",
          body: "The monitoring server and its security group are defined in Terraform rather than set up by hand.",
        },
      ],
      results: [
        { value: "about 75%", label: "fewer known vulnerabilities" },
        { value: "3", label: "scan stages before deploy" },
        { value: "2", label: "replicas with rolling updates" },
      ],
      resultsNote:
        "The vulnerability figure compares a manual baseline scan before the pipeline with Trivy and OWASP Dependency-Check output after it, on the same codebase. This is a personal project with no production traffic.",
      limitations: [
        "Images are tagged latest rather than with a commit hash.",
        "The Terraform security group allows SSH from any address and should be restricted before real use.",
        "AWS keys are passed as Terraform variables. An IAM role would be better.",
      ],
    },
  },
  {
    slug: "ltx-video-runpod-worker",
    title: "LTX-Video GPU Worker",
    year: "2026",
    category: ["ai", "platform"],
    blurb:
      "A FastAPI service that turns images into short videos with the LTX-Video distilled model on RunPod GPUs, uploading results to Cloudflare R2 or Google Cloud Storage.",
    stack: ["Python", "FastAPI", "PyTorch", "RunPod", "Cloudflare R2", "Docker"],
    repo: gh("ltx-video-runpod-worker"),
  },
  {
    slug: "nest-property-rental-platform",
    title: "Nest Rental Platform",
    year: "2024",
    category: ["fullstack"],
    blurb:
      "A rental marketplace with listings, map search, viewing appointments, reviews and in-app chat, secured with JWT authentication.",
    stack: ["Angular", "Spring Boot", "MongoDB", "Google Maps API", "JWT"],
    repo: gh("nest-property-rental-platform"),
  },
  {
    slug: "the-hollowing-game",
    title: "The Hollowing",
    year: "2025",
    category: ["games"],
    badge: "1st place",
    blurb:
      "A first-person horror game where your own microphone is the threat. Built solo in Unity with AI-assisted coding and AI-generated audio and video, and placed first of about 100 participants.",
    stack: ["Unity", "C#", "Codex", "ElevenLabs"],
    repo: gh("the-hollowing-game"),
  },
  {
    slug: "kiinect-campus-app",
    title: "KIInect",
    year: "2023",
    category: ["fullstack"],
    blurb: "A campus Q and A app for university students with Google sign-in through Firebase.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    repo: gh("kiinect-campus-app"),
  },
  {
    slug: "vibe-chat-app",
    title: "Vibe",
    year: "2023",
    category: ["fullstack"],
    blurb: "A real-time chat app with Google sign-in, user search and file sharing over Socket.io.",
    stack: ["React", "Node.js", "Socket.io", "MongoDB"],
    repo: gh("vibe-chat-app"),
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);
