/* cover: the opening slide, under an aurora. The date and venue come from deck.json › config. */
import type { CSSProperties } from 'react';
import { Slide, Text, useSlide, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; kicker?: string; title: string; subtitle?: string; speakers?: { name: string; role?: string }[] };

export default function Cover({ values: v }: TemplateProps<Values>) {
  const { config } = useSlide();
  const when = [config.date, config.venue].filter(Boolean).join(' · ');
  const lines = v.title.split('\n');
  return (
    <Slide variant={v.variant} className={s.slide}>
      <div className={s.sky} aria-hidden="true">
        <i className={s.stars} />
        <i className={`${s.band} ${s.b1}`}><i /></i>
        <i className={`${s.band} ${s.b2}`}><i /></i>
        <i className={`${s.band} ${s.b3}`}><i /></i>
        <i className={s.horizon} />
        <i className={s.shade} />
      </div>
      <div className={s.body}>
        <Text className={s.kicker} value={v.kicker} />
        {/* each line rises out of its own mask, one after another */}
        <h1 className={`${s.title} ${v.title.length > 40 ? s.long : ''}`}>
          {lines.map((line, i) => (
            <span key={i} className={s.line} style={{ '--i': i } as CSSProperties}><Text as="span" className={s.words} value={line} /></span>
          ))}
        </h1>
        <Text className={s.subtitle} value={v.subtitle} />
        {!!v.speakers?.length && (
          <ul className={s.speakers}>
            {v.speakers.map((p, i) => (
              <li key={i} style={{ '--i': i } as CSSProperties}><Text as="b" value={p.name} /><Text as="span" value={p.role} /></li>
            ))}
          </ul>
        )}
        {when && <p className={s.when}>{when}</p>}
      </div>
    </Slide>
  );
}
