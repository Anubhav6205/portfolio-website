import type { CaseStudy } from "@/content/projects";

type Side = "l" | "r" | "t" | "b";
type N = {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "accent" | "ghost";
};
type E = { from: string; to: string; fs?: Side; ts?: Side; label?: string; loop?: boolean; bend?: number };
type Spec = {
  w: number;
  h: number;
  nodes: N[];
  edges: E[];
  groups?: { x: number; y: number; w: number; h: number; label: string }[];
};

const NW = 132;
const NH = 52;

const specs: Record<CaseStudy["diagram"], Spec> = {
  rag: {
    w: 860,
    h: 364,
    nodes: [
      { id: "q", x: 20, y: 60, w: 104, label: "Question", tone: "ghost" },
      { id: "d", x: 172, y: 60, label: "Decompose", sub: "evidence checklist" },
      { id: "s", x: 352, y: 60, w: 164, label: "Hybrid search", sub: "dense + BM25, RRF, rerank" },
      { id: "c", x: 580, y: 60, w: 140, label: "Coverage check", sub: "up to 3 hops", tone: "accent" },
      { id: "r", x: 584, y: 236, label: "Response", sub: "GPT-4.1-mini" },
      { id: "v", x: 384, y: 236, label: "Citation check", sub: "claim to chunk", tone: "accent" },
      { id: "h", x: 184, y: 236, label: "Human verify", sub: "approve or reject" },
      { id: "a", x: 20, y: 236, w: 116, label: "Cited answer", tone: "ghost" },
    ],
    edges: [
      { from: "q", to: "d" },
      { from: "d", to: "s" },
      { from: "s", to: "c" },
      { from: "c", to: "r", fs: "b", ts: "t", label: "sufficient" },
      { from: "r", to: "v", fs: "l", ts: "r" },
      { from: "v", to: "h", fs: "l", ts: "r" },
      { from: "h", to: "a", fs: "l", ts: "r" },
      { from: "c", to: "d", fs: "t", ts: "t", loop: true, bend: -40, label: "missing evidence" },
      { from: "v", to: "r", fs: "b", ts: "b", loop: true, bend: 30, label: "unsupported claim" },
      { from: "h", to: "d", fs: "t", ts: "b", loop: true, label: "rejected with feedback" },
    ],
  },
  newsroom: {
    w: 860,
    h: 360,
    nodes: [
      { id: "in", x: 20, y: 154, w: 100, label: "Request", tone: "ghost" },
      { id: "g", x: 160, y: 154, label: "Guardrail", sub: "screens input", tone: "accent" },
      { id: "s", x: 360, y: 154, w: 140, label: "Supervisor", sub: "routes the work", tone: "accent" },
      { id: "r", x: 600, y: 50, w: 176, label: "Researcher", sub: "corrective RAG, Tavily" },
      { id: "w", x: 600, y: 154, w: 176, label: "Writer", sub: "drafts, streams tokens" },
      { id: "e", x: 600, y: 258, w: 176, label: "Editor", sub: "sends back for edits" },
      { id: "h", x: 360, y: 284, w: 140, label: "Human verify", sub: "final approval" },
      { id: "out", x: 160, y: 284, label: "Final draft", tone: "ghost" },
    ],
    edges: [
      { from: "in", to: "g" },
      { from: "g", to: "s" },
      { from: "s", to: "r", fs: "r", ts: "l" },
      { from: "s", to: "w", fs: "r", ts: "l" },
      { from: "s", to: "e", fs: "r", ts: "l" },
      { from: "r", to: "s", fs: "t", ts: "t", loop: true, bend: -30, label: "results back to supervisor" },
      { from: "s", to: "h", fs: "b", ts: "t", label: "finish" },
      { from: "h", to: "out", fs: "l", ts: "r" },
    ],
  },
  cicd: {
    w: 900,
    h: 340,
    nodes: [
      { id: "gh", x: 16, y: 40, w: 92, label: "GitHub", tone: "ghost" },
      { id: "j", x: 140, y: 40, w: 100, label: "Jenkins", sub: "pipeline" },
      { id: "sq", x: 272, y: 40, w: 118, label: "SonarQube", sub: "quality gate", tone: "accent" },
      { id: "dc", x: 422, y: 40, w: 128, label: "OWASP DC", sub: "dependency scan", tone: "accent" },
      { id: "tv", x: 582, y: 40, w: 110, label: "Trivy", sub: "fs + image", tone: "accent" },
      { id: "dh", x: 724, y: 40, w: 150, label: "Docker Hub", sub: "image push" },
      { id: "k", x: 724, y: 236, w: 150, label: "Amazon EKS", sub: "2 replicas, rolling" },
      { id: "p", x: 444, y: 236, w: 172, label: "Prometheus", sub: "Blackbox probes" },
      { id: "gf", x: 232, y: 236, w: 128, label: "Grafana", sub: "dashboards" },
      { id: "m", x: 16, y: 236, w: 130, label: "Email", sub: "build result", tone: "ghost" },
    ],
    edges: [
      { from: "gh", to: "j" },
      { from: "j", to: "sq" },
      { from: "sq", to: "dc" },
      { from: "dc", to: "tv" },
      { from: "tv", to: "dh" },
      { from: "dh", to: "k", fs: "b", ts: "t", label: "kubectl apply" },
      { from: "p", to: "k", fs: "r", ts: "l", label: "probes" },
      { from: "p", to: "gf", fs: "l", ts: "r" },
      { from: "j", to: "m", fs: "b", ts: "t", label: "notify" },
    ],
    groups: [{ x: 216, y: 214, w: 416, h: 104, label: "Terraform: monitoring EC2" }],
  },
};

function anchor(n: N, side: Side) {
  const w = n.w ?? NW;
  const h = n.h ?? NH;
  if (side === "l") return { x: n.x, y: n.y + h / 2 };
  if (side === "r") return { x: n.x + w, y: n.y + h / 2 };
  if (side === "t") return { x: n.x + w / 2, y: n.y };
  return { x: n.x + w / 2, y: n.y + h };
}

function edgePath(spec: Spec, e: E) {
  const a = spec.nodes.find((n) => n.id === e.from)!;
  const b = spec.nodes.find((n) => n.id === e.to)!;
  const p = anchor(a, e.fs ?? "r");
  const q = anchor(b, e.ts ?? "l");
  if (e.loop && e.bend) {
    const y = e.bend > 0 ? Math.max(p.y, q.y) + e.bend : Math.min(p.y, q.y) + e.bend;
    return {
      d: `M${p.x},${p.y} C${p.x},${y} ${q.x},${y} ${q.x},${q.y}`,
      mx: (p.x + q.x) / 2,
      my: e.bend > 0 ? y + 18 : y + 6,
    };
  }
  const vertical = (e.fs === "b" || e.fs === "t") && (e.ts === "t" || e.ts === "b");
  const midY = (p.y + q.y) / 2;
  const midX = (p.x + q.x) / 2;
  const d = vertical
    ? `M${p.x},${p.y} C${p.x},${midY} ${q.x},${midY} ${q.x},${q.y}`
    : `M${p.x},${p.y} C${midX},${p.y} ${midX},${q.y} ${q.x},${q.y}`;
  return { d, mx: midX, my: midY };
}

export function ArchDiagram({ kind, caption }: { kind: CaseStudy["diagram"]; caption?: string }) {
  const spec = specs[kind];
  const markerId = `arrow-${kind}`;
  return (
    <figure className="overflow-hidden rounded-[6px] border border-line bg-sunken">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${spec.w} ${spec.h}`}
          className="block w-full min-w-[680px]"
          role="img"
          aria-label={caption ?? "Architecture diagram"}
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
            </marker>
            <pattern id={`dots-${kind}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--line-strong)" />
            </pattern>
          </defs>
          <rect width={spec.w} height={spec.h} fill={`url(#dots-${kind})`} opacity="0.6" />

          {spec.groups?.map((g) => (
            <g key={g.label}>
              <rect
                x={g.x}
                y={g.y}
                width={g.w}
                height={g.h}
                rx="6"
                fill="none"
                stroke="var(--line-strong)"
                strokeDasharray="3 5"
              />
              <text x={g.x + 12} y={g.y + g.h - 8} fontSize="10" fontFamily="var(--font-mono)" fill="var(--muted)">
                {g.label}
              </text>
            </g>
          ))}

          {spec.edges.map((e) => {
            const { d, mx, my } = edgePath(spec, e);
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={e.loop ? "var(--accent)" : "var(--muted)"}
                  strokeOpacity={e.loop ? 0.8 : 0.6}
                  strokeWidth="1.25"
                  className={e.loop ? "flow" : undefined}
                  markerEnd={`url(#${markerId})`}
                />
                {e.label && (
                  <text
                    x={mx}
                    y={my - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fill={e.loop ? "var(--accent)" : "var(--muted)"}
                    paintOrder="stroke"
                    stroke="var(--bg-sunken)"
                    strokeWidth="4"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {spec.nodes.map((n) => {
            const w = n.w ?? NW;
            const h = n.h ?? NH;
            return (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={w}
                  height={h}
                  rx="4"
                  fill={n.tone === "ghost" ? "var(--bg-sunken)" : "var(--bg-raised)"}
                  stroke={n.tone === "accent" ? "var(--accent)" : "var(--line-strong)"}
                  strokeOpacity={n.tone === "accent" ? 0.85 : 1}
                  strokeDasharray={n.tone === "ghost" ? "4 4" : undefined}
                />
                <text
                  x={n.x + w / 2}
                  y={n.y + (n.sub ? h / 2 - 3 : h / 2 + 4)}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="var(--font-sans)"
                  fill="var(--fg)"
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={n.x + w / 2}
                    y={n.y + h / 2 + 13}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--font-mono)"
                    fill="var(--muted)"
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      {caption && <figcaption className="border-t border-line px-5 py-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
