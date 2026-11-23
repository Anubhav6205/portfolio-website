export type Post = {
  title: string;
  url: string;
  date: string;
  blurb?: string;
  tags: string[];
};

export const blogHome = "https://anubhavinsights.hashnode.dev";
export const blogFeed = "https://anubhavinsights.hashnode.dev/rss.xml";

// Posts that should not appear on the portfolio even if they are in the feed.
export const hiddenSlugs = ["solving-two-sum-leetcode-solution"];

// Short blurbs written for the site, keyed by post slug. Used for feed posts too.
export const blurbs: Record<string, { blurb: string; tags: string[] }> = {
  "from-pdf-to-answer-a-langchain-walkthrough-of-rag-embeddings-and-reranking": {
    blurb: "Cosine similarity gets you close and reranking gets you right. A walkthrough of building both into one document Q and A bot.",
    tags: ["RAG", "LangChain"],
  },
  "how-to-eks": {
    blurb: "Running workloads on EKS with Fargate and ALB ingress, then watching them with Grafana.",
    tags: ["Kubernetes", "AWS"],
  },
  "url-shortener-a-step-by-step-guide-to-architecture-caching-apis-and-scaling": {
    blurb: "A system design walkthrough covering scope, APIs, storage, caching and how the service scales.",
    tags: ["System design"],
  },
  "deploy-applications-on-aws-a-step-by-step-guide-to-ec2-elb-route-53-and-more": {
    blurb: "Moving a multi-service Java app with RabbitMQ, Memcached and MySQL onto EC2, ELB and Route 53.",
    tags: ["AWS", "DevOps"],
  },
};

// Used when the feed cannot be reached at build time.
export const fallbackPosts: Post[] = [
  {
    title: "From PDF to Answer: A LangChain Walkthrough of RAG, Embeddings, and Reranking",
    url: `${blogHome}/from-pdf-to-answer-a-langchain-walkthrough-of-rag-embeddings-and-reranking`,
    date: "2026-06-23",
    ...blurbs["from-pdf-to-answer-a-langchain-walkthrough-of-rag-embeddings-and-reranking"],
  },
  {
    title: "Simplifying Kubernetes Operations with AWS EKS Fargate and ALB Ingress",
    url: `${blogHome}/how-to-eks`,
    date: "2025-09-28",
    ...blurbs["how-to-eks"],
  },
  {
    title: "URL Shortener: A Step-by-Step Guide to Architecture, Caching, APIs, and Scaling",
    url: `${blogHome}/url-shortener-a-step-by-step-guide-to-architecture-caching-apis-and-scaling`,
    date: "2025-08-28",
    ...blurbs["url-shortener-a-step-by-step-guide-to-architecture-caching-apis-and-scaling"],
  },
  {
    title: "Deploy Applications on AWS: A Step-by-Step Guide to EC2, ELB, Route 53, and More",
    url: `${blogHome}/deploy-applications-on-aws-a-step-by-step-guide-to-ec2-elb-route-53-and-more`,
    date: "2025-01-30",
    ...blurbs["deploy-applications-on-aws-a-step-by-step-guide-to-ec2-elb-route-53-and-more"],
  },
];
