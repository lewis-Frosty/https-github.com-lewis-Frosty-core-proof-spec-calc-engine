'use client';

import React from 'react';

/** Scroll-reveal wrapper. Default state is visible; JS only arms the hidden
 *  state once it can guarantee a fallback, so content never gets stuck hidden. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.setAttribute('data-armed', '');
    const disarm = () => el.removeAttribute('data-armed');
    let safety: ReturnType<typeof setTimeout>;
    let finish: ReturnType<typeof setTimeout>;
    const reveal = () => {
      setTimeout(() => el.classList.add('in'), delay);
      finish = setTimeout(disarm, delay + 700);
    };
    const near = el.getBoundingClientRect().top < window.innerHeight * 1.05;
    if (near) {
      requestAnimationFrame(reveal);
    } else {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
            clearTimeout(safety);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      );
      io.observe(el);
      safety = setTimeout(() => {
        io.disconnect();
        disarm();
        el.classList.add('in');
      }, 1500);
    }
    return () => {
      clearTimeout(safety);
      clearTimeout(finish);
    };
  }, [delay]);
  return (
    <div ref={ref} className={'reveal ' + className} style={style}>
      {children}
    </div>
  );
}
