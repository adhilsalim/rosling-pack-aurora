/* stat: one to three big numbers that count up from zero. */
import { useEffect, useState, type CSSProperties } from 'react';
import { Slide, Text, useSlide, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Stat = { value: number; decimals: number; prefix?: string; suffix?: string; label: string; detail?: string };
type Values = { variant: string; kicker?: string; title?: string; stats: Stat[]; source?: string };

const COUNT_MS = 1800, START_MS = 450, STEP_MS = 160;

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
      setP(1 - Math.pow(1 - t, 4));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [instant, ms, delay]);
  return p;
}

const format = (n: number, decimals: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function Figure({ stat, index, size }: { stat: Stat; index: number; size: number }) {
  const d = Math.max(0, Math.min(2, Math.round(stat.decimals)));
  const p = useProgress(COUNT_MS, START_MS + index * STEP_MS);
  const final = format(stat.value, d);
  return (
    <p className={s.value} style={{ fontSize: size }}>
      {stat.prefix && <span className={s.affix}>{stat.prefix}</span>}
      {/* the final number holds the width, so nothing moves while the digits count */}
      <span className={s.digits}><span className={s.hold} aria-hidden="true">{final}</span><span className={s.count}>{format(stat.value * p, d)}</span></span>
      {stat.suffix && <span className={s.affix}>{stat.suffix}</span>}
    </p>
  );
}

export default function StatSlide({ values: v }: TemplateProps<Values>) {
  const n = v.stats.length;
  // as large as the longest number allows in its column
  const longest = Math.max(...v.stats.map((st) => format(st.value, st.decimals).length + ((st.prefix?.length ?? 0) + (st.suffix?.length ?? 0)) * 0.5));
  const room = n === 1 ? 1100 : n === 2 ? 760 : 500;
  const size = Math.round(Math.min(n === 1 ? 300 : n === 2 ? 200 : 150, room / (longest * 0.62)));
  return (
    <Slide variant={v.variant} className={s.slide}>
      <i className={s.glow} aria-hidden="true" />
      <div className="content">
        <Text className={s.kicker} value={v.kicker} />
        <Text as="h1" className={s.title} value={v.title} />
        <div className={`${s.stats} ${n === 1 ? s.one : ''}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {v.stats.map((st, i) => (
            <div key={i} className={s.stat} style={{ '--i': i } as CSSProperties}>
              <Figure stat={st} index={i} size={size} />
              <div className={s.about}>
                <Text className={s.label} value={st.label} />
                <Text className={s.detail} value={st.detail} />
              </div>
            </div>
          ))}
        </div>
        <Text className={s.source} value={v.source} />
      </div>
    </Slide>
  );
}
