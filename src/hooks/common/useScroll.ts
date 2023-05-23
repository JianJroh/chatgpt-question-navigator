import { useEffect } from 'react';

export function useScroll(el: HTMLElement, listener: (e: Event) => void) {
  const _listener = (e: Event) => {
    requestAnimationFrame(() => {
      listener(e);
    });
  };
  useEffect(() => {
    el.addEventListener('scroll', _listener);
    return () => {
      el.removeEventListener('scroll', _listener);
    };
  });
}
