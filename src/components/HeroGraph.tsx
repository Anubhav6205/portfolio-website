/**
 * A faint knowledge graph behind the hero. A few nodes and edges light up in
 * sequence, like a retrieval hop walking the graph. Pure SVG and CSS.
 */

type Node = { x: number; y: number };

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const W = 1200;
const H = 720;

function build() {
  const rand = seeded(6205);
  const nodes: Node[] = [];
  // Jittered grid keeps nodes spread out without clumping.
  const cols = 9;
  const rows = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.18) continue;
      nodes.push({
        x: ((c + 0.5) / cols) * W + (rand() - 0.5) * 110,
        y: ((r + 0.5) / rows) * H + (rand() - 0.5) * 100,
      });
    }
  }
  const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const edges = new Map<string, [number, number]>();
  nodes.forEach((n, i) => {
    const nearest = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    nearest.forEach(({ j }) => edges.set(key(i, j), [i, j]));
  });

  // Walk a path of connected nodes to animate as the "retrieval hop".
  const adj = new Map<number, number[]>();
  edges.forEach(([a, b]) => {
    adj.set(a, [...(adj.get(a) ?? []), b]);
    adj.set(b, [...(adj.get(b) ?? []), a]);
  });
  const path: number[] = [Math.floor(nodes.length * 0.62)];
  for (let step = 0; step < 6; step++) {
    const next = (adj.get(path[path.length - 1]) ?? []).filter((n) => !path.includes(n));
    if (!next.length) break;
    path.push(next[Math.floor(rand() * next.length)]);
  }
  return { nodes, edges: [...edges.values()], path };
}

const { nodes, edges, path } = build();
const hitEdge = new Map<string, number>();
for (let i = 0; i < path.length - 1; i++) {
  const a = path[i];
  const b = path[i + 1];
  hitEdge.set(a < b ? `${a}-${b}` : `${b}-${a}`, i);
}

export function HeroGraph() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]"
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="graph-layer h-[110%] w-[110%] will-change-transform">
        <g>
          {edges.map(([a, b]) => {
            const k = a < b ? `${a}-${b}` : `${b}-${a}`;
            const step = hitEdge.get(k);
            return (
              <line
                key={k}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                strokeWidth={1}
                className={`graph-edge ${step !== undefined ? "is-hit" : ""}`}
                style={step !== undefined ? ({ "--d": `${step * 0.45 + 0.2}s` } as React.CSSProperties) : undefined}
              />
            );
          })}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={2.2} className="graph-node" />
          ))}
          {path.map((i, step) => (
            <circle
              key={`hit-${i}`}
              cx={nodes[i].x}
              cy={nodes[i].y}
              r={4}
              className="graph-hit"
              style={{ "--d": `${step * 0.45}s` } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
