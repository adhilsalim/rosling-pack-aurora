/* quote: someone else's words, revealed one word at a time. */
import type { CSSProperties } from 'react';
import { Slide, Text, Media, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; quote: string; name?: string; role?: string; image?: string };

/* the quote as words, keeping **bold** across words and line breaks; each word is still drawn by <Text> */
function words(text: string) {
  const out: { word: string; br?: boolean }[] = [];
  let bold = false;
  for (const part of text.split('**')) {
    for (const [j, line] of part.split('\n').entries()) {
      if (j > 0) out.push({ word: '', br: true });
      for (const w of line.split(/\s+/).filter(Boolean)) out.push({ word: bold ? `**${w}**` : w });
    }
    bold = !bold;
  }
  return out;
}

export default function Quote({ values: v }: TemplateProps<Values>) {
  const list = words(v.quote);
  const size = v.quote.length > 140 ? s.long : v.quote.length > 90 ? s.medium : '';
  let n = 0;
  return (
    <Slide variant={v.variant} className={s.slide}>
      <i className={s.glow} aria-hidden="true" />
      <div className={s.body}>
        <span className={s.mark} aria-hidden="true">“</span>
        <blockquote className={`${s.quote} ${size}`}>
          {list.map((w, i) => w.br ? <br key={i} /> : (
            <span key={i} className={s.word} style={{ '--i': n++ } as CSSProperties}><Text as="span" value={w.word} />{' '}</span>
          ))}
        </blockquote>
        {(v.name || v.role) && (
          <div className={s.by} style={{ '--i': n } as CSSProperties}>
            {v.image && <div className={s.face}><Media src={v.image} alt={v.name ?? ''} className={s.photo} /></div>}
            <div>
              <Text className={s.name} value={v.name} />
              <Text className={s.role} value={v.role} />
            </div>
          </div>
        )}
      </div>
    </Slide>
  );
}
