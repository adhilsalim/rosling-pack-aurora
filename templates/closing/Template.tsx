/* closing: the last slide, under the aurora, with an optional link as a QR code. */
import type { CSSProperties } from 'react';
import { Slide, Text, QrCode, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; title: string; text?: string; contacts?: string[]; link?: string; link_label: string };

export default function Closing({ values: v }: TemplateProps<Values>) {
  let n = 0;   // counts letters across words, for the stagger
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
        <div className={s.words}>
          {/* each letter rises on its own, a moment after the one before */}
          <h1 className={`${s.title} ${v.title.length > 16 ? s.long : v.title.length > 10 ? s.medium : ''}`} aria-label={v.title}>
            {v.title.split(' ').map((word, w) => (
              <span key={w} className={s.word} aria-hidden="true">
                {[...word].map((ch, j) => { const i = n++; return <span key={j} className={s.letter} style={{ '--i': i } as CSSProperties}>{ch}</span>; })}
              </span>
            ))}
          </h1>
          <Text className={s.text} value={v.text} />
          {!!v.contacts?.length && (
            <ul className={s.contacts}>{v.contacts.map((c, i) => <li key={i} style={{ '--i': i } as CSSProperties}>{c}</li>)}</ul>
          )}
        </div>
        {v.link && (
          <div className={s.card}>
            <div className={s.paper}><QrCode className={s.qr} value={v.link} /></div>
            <Text className={s.label} value={v.link_label} />
            <p className={s.url}>{v.link.replace(/^https?:\/\//, '')}</p>
          </div>
        )}
      </div>
    </Slide>
  );
}
