export function StationeryArt({ variant = 0 }: { variant?: number }) {
  return <div className={`stationery-art art-${variant}`} aria-hidden="true">
    <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
    <div className="art-paper paper-back"><span /><span /><span /></div>
    <div className="art-book"><div className="book-edge" /><div className="book-label">DAISY<span>✳</span></div><div className="book-lines" /></div>
    <div className="art-pencil pencil-one"><i /></div><div className="art-pencil pencil-two"><i /></div>
    <div className="art-star star-one">✳</div><div className="art-star star-two">✦</div>
    <div className="art-sticker">{variant === 1 ? '100%\nIDEAS' : variant === 2 ? '¡A CREAR!' : '♥'}</div>
  </div>;
}
