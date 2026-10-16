/* spotlight: one picture across the whole slide, slowly drifting closer, with words over a soft shade. */
import { Slide, Text, Media, type TemplateProps } from 'rosling';
import s from './style.module.css';

type Values = { variant: string; image: string; alt?: string; kicker?: string; title: string; caption?: string; credit?: string; side: string };

export default function Spotlight({ values: v }: TemplateProps<Values>) {
  const right = v.side === 'right';
  return (
    <Slide variant={v.variant} className={`${s.slide} ${right ? s.right : ''}`}>
      <div className={s.picture}><Media src={v.image} alt={v.alt} className={s.media} /></div>
      <i className={s.shade} aria-hidden="true" />
      <div className={s.words}>
        <Text className={s.kicker} value={v.kicker} />
        <Text as="h1" className={s.title} value={v.title} />
        <Text className={s.caption} value={v.caption} />
      </div>
      <Text className={s.credit} value={v.credit} />
    </Slide>
  );
}
