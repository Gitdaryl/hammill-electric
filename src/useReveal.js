import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Returns a [ref, isVisible] pair.
 * Attach ref to the element you want to animate in.
 * once: true means it won't re-hide when scrolled back up.
 */
export function useReveal({ threshold = 0.12, once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion); // skip if reduced motion

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}
