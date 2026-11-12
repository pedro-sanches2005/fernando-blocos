import { num, type Bloco } from "@/data/blocos";

const GRID: Record<number, [number, number]> = { 6: [2, 3], 9: [3, 3], 12: [3, 4] };
const FONT = { fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 16 } as const;

function Cota({ x1, y1, x2, y2, label, tx, ty, rot = 0 }: {
  x1: number; y1: number; x2: number; y2: number; label: string; tx: number; ty: number; rot?: number;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = (-(y2 - y1) / len) * 4, ny = ((x2 - x1) / len) * 4;
  return (
    <g stroke="var(--clay)" strokeWidth={1.5} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <line x1={x1 - nx} y1={y1 - ny} x2={x1 + nx} y2={y1 + ny} />
      <line x1={x2 - nx} y1={y2 - ny} x2={x2 + nx} y2={y2 + ny} />
      <text x={tx} y={ty} transform={`rotate(${rot} ${tx} ${ty})`} textAnchor="middle" stroke="none" fill="var(--ink)" style={FONT}>{label}</text>
    </g>
  );
}

export default function Cotas({ b }: { b: Bloco }) {
  const w = num(b.largura), h = num(b.altura), l = num(b.comprimento);
  const s = Math.min(200 / (w + 0.433 * l), 170 / (h + 0.25 * l));
  const W = w * s, H = h * s, dx = l * 0.433 * s, dy = l * 0.25 * s;
  const x0 = 40, y0 = dy + 14;
  const vw = x0 + W + dx + 54, vh = y0 + H + 56;
  const [cols, rows] = GRID[b.furos] ?? [3, 3];
  const m = 0.9 * s, t = 0.7 * s;
  const hw = (W - 2 * m - (cols - 1) * t) / cols, hh = (H - 2 * m - (rows - 1) * t) / rows;
  const holes = [];
    for (let r = 0; b.furos && r < rows; r++)
    for (let c = 0; c < cols; c++)
      holes.push(<rect key={`${r}-${c}`} x={x0 + m + c * (hw + t)} y={y0 + m + r * (hh + t)} width={hw} height={hh} rx={1.5}
        fill="#2a1a12" fillOpacity={0.3} stroke="var(--ink)" strokeWidth={1} />);
        if (b.categoria === "estrutural") {
    // no estrutural os furos ficam na face de cima, como na foto
    const P = (u: number, v: number) => `${x0 + u * W + v * dx},${y0 - v * dy}`;
    const cel: [number, number, number, number][] = [[0.22, 0.78, 0.14, 0.4], [0.22, 0.78, 0.6, 0.86], [0.3, 0.7, 0.44, 0.56]];
    for (let k = 0; k < 5; k++) { const v = 0.05 + k * 0.19; cel.push([0.07, 0.17, v, v + 0.12], [0.83, 0.93, v, v + 0.12]); }
    for (let n = 0; n < cel.length; n++) {
      const [u1, u2, v1, v2] = cel[n];
      holes.push(<polygon key={`t${n}`} points={`${P(u1, v1)} ${P(u2, v1)} ${P(u2, v2)} ${P(u1, v2)}`}
        fill="#2a1a12" fillOpacity={0.3} stroke="var(--ink)" strokeWidth={1} />);
    }
  }
  const lx1 = x0 + W + 7, ly1 = y0 + H + 12, lx2 = x0 + W + dx + 7, ly2 = y0 + H - dy + 12;
  const st = { stroke: "var(--ink)", strokeWidth: 1.6, strokeLinejoin: "round" as const };

  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} className="cotas" role="img"
      aria-label={`Desenho técnico do bloco ${b.largura} por ${b.altura} por ${b.comprimento} centímetros`}>
      <polygon points={`${x0},${y0} ${x0 + W},${y0} ${x0 + W + dx},${y0 - dy} ${x0 + dx},${y0 - dy}`} fill="var(--sand)" {...st} />
      <polygon points={`${x0 + W},${y0} ${x0 + W + dx},${y0 - dy} ${x0 + W + dx},${y0 + H - dy} ${x0 + W},${y0 + H}`} fill="var(--mortar)" {...st} />
      <rect x={x0} y={y0} width={W} height={H} fill="var(--paper2)" {...st} />
      {holes}
      <Cota x1={x0} y1={y0 + H + 20} x2={x0 + W} y2={y0 + H + 20} label={b.largura} tx={x0 + W / 2} ty={y0 + H + 38} />
      <Cota x1={x0 - 20} y1={y0} x2={x0 - 20} y2={y0 + H} label={b.altura} tx={x0 - 27} ty={y0 + H / 2 + 5} rot={-90} />
      <Cota x1={lx1} y1={ly1} x2={lx2} y2={ly2} label={b.comprimento} tx={(lx1 + lx2) / 2 + 7} ty={(ly1 + ly2) / 2 + 14} rot={-30} />
      <text x={vw / 2} y={vh - 4} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" }}>medidas em cm</text>
    </svg>
  );
}
