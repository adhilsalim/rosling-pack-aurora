/* bars: a horizontal bar chart whose bars grow while their values count up. */
import { useEffect, useState, type CSSProperties } from 'react';
import { Slide, Text, useSlide, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; kicker?: string; title: string; unit?: string; decimals: number; bars: { label: string; value: number; highlight: boolean }[]; note?: string };

const GROW_MS = 1400, START_MS = 500, STEP_MS = 110;

/* 0 → 1 over `ms`, easing out. Thumbnails, the phone preview and reduced motion get 1 straight away. */
function useProgress(ms: number, delay: number) {
  const { mode } = useSlide();
  const instant = mode === 'thumb' || mode === 'remote' || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [p, setP] = useState(instant ? 1 : 0);
  useEffect(() => {
    if (instant) { setP(1); return; }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / ms));
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [instant, ms, delay]);
  return p;
}

const format = (n: number, decimals: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function Value({ value, decimals, unit, delay }: { value: number; decimals: number; unit?: string; delay: number }) {
  const p = useProgress(GROW_MS, delay);
  return (
    <span className={s.value}>
      {/* the final value holds the width, so nothing moves while the digits count */}
      <span className={s.hold} aria-hidden="true">{format(value, decimals)}</span><span className={s.count}>{format(value * p, decimals)}</span>
      {unit && <span className={s.unit}>{unit}</span>}
    </span>
  );
}

export default function Bars({ values: v }: TemplateProps<Values>) {
  const d = Math.max(0, Math.min(2, Math.round(v.decimals)));
  const top = Math.max(...v.bars.map((b) => b.value), 0) || 1;
  const n = v.bars.length;
  return (
    <Slide variant={v.variant} className={s.slide}>
      <div className="content">
        <Text className={s.kicker} value={v.kicker} />
        <Text as="h1" className={s.title} value={v.title} />
        <ul className={`${s.bars} ${n > 5 ? s.many : ''}`}>
          {v.bars.map((b, i) => {
            const share = Math.max(0, b.value) / top;
            return (
              <li key={i} className={b.highlight ? s.on : ''} style={{ '--i': i, '--w': share } as CSSProperties}>
                <Text as="span" className={s.label} value={b.label} />
                <span className={s.track}>
                  <span className={s.bar} />
                  <span className={s.end}><Value value={b.value} decimals={d} unit={v.unit} delay={START_MS + i * STEP_MS} /></span>
                </span>
              </li>
            );
          })}
        </ul>
        <Text className={s.note} value={v.note} />
      </div>
    </Slide>
  );
}
