/* chapter: a divider between parts of the talk, with a big glowing number. */
import type { CSSProperties } from 'react';
import { Slide, Text, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; number?: string; label?: string; title: string; text?: string };

export default function Chapter({ values: v }: TemplateProps<Values>) {
  return (
    <Slide variant={v.variant} className={s.slide}>
      <div className={s.sky} aria-hidden="true">
        <i className={s.stars} />
        <i className={`${s.band} ${s.b1}`}><i /></i>
        <i className={`${s.band} ${s.b2}`}><i /></i>
      </div>
      <div className={s.body}>
        {v.number && <p className={s.num}><span>{v.number}</span></p>}
        <div className={s.words}>
          <Text className={s.label} value={v.label} />
          <h1 className={s.title}>
            {v.title.split('\n').map((line, i) => (
              <span key={i} className={s.line} style={{ '--i': i } as CSSProperties}><Text as="span" className={s.rise} value={line} /></span>
            ))}
          </h1>
          <Text className={s.text} value={v.text} />
        </div>
      </div>
    </Slide>
  );
}
