/* aurora theme footer: the event on the left, "slide / total" on the right.
   The centre stays empty: the presenter timer appears there. */
import type { FooterProps } from 'rosling';

const two = (n: number) => String(n).padStart(2, '0');

export default function Footer({ number, total, config }: FooterProps) {
  return (
    <footer className="slide-footer">
      <div className="event">{config.event ?? ''}</div>
      {number > 0 && <div className="num"><b>{two(number)}</b>{total > 0 && <span> / {two(total)}</span>}</div>}
    </footer>
  );
}
