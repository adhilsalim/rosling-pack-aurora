/* timeline: steps along a line that draws itself from left to right. */
import type { CSSProperties } from 'react';
import { Slide, Text, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; kicker?: string; title: string; steps: { when?: string; title: string; text?: string; now: boolean }[] };

export default function Timeline({ values: v }: TemplateProps<Values>) {
  const n = v.steps.length;
  return (
    <Slide variant={v.variant} className={s.slide}>
      <div className="content">
        <Text className={s.kicker} value={v.kicker} />
        <Text as="h1" className={s.title} value={v.title} />
        <ol className={`${s.steps} ${n > 4 ? s.many : ''}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, '--n': n } as CSSProperties}>
          {v.steps.map((st, i) => (
            <li key={i} className={st.now ? s.now : ''} style={{ '--i': i } as CSSProperties}>
              <span className={s.dot} aria-hidden="true" />
              <Text className={s.when} value={st.when} />
              <Text as="h3" className={s.head} value={st.title} />
              <Text className={s.text} value={st.text} />
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
