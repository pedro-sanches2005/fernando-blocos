const TONES = ["#a4442a", "#b45733", "#94391f", "#bf6544", "#a94d2d"];
const ROWS = 22, COLS = 18;

export default function Wall() {
  return (
    <div className="wall" aria-hidden>
      {Array.from({ length: ROWS }, (_, r) => (
        <div key={r} className={r % 2 ? "row odd" : "row"}>
          {Array.from({ length: COLS }, (_, c) => (
            <i key={c} style={{
              background: TONES[(r * 7 + c * 13 + ((r * c) % 5)) % TONES.length],
              animationDelay: `${((ROWS - 1 - r) * 0.035 + c * 0.008).toFixed(2)}s`,
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}
