import { type RefObject, useCallback, useEffect } from 'react';

type MaybeRefObject<T> = T | RefObject<T>;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  el: MaybeRefObject<HTMLElement | null>,
  type: K,
  listener: (e: HTMLElementEventMap[K]) => void
) {
  const _listener = useCallback(
    (e: HTMLElementEventMap[K]) => {
      requestAnimationFrame(() => {
        listener(e);
      });
    },
    [listener]
  );

  useEffect(() => {
    const targetEl = el && ('current' in el ? el.current : el);

    if (!targetEl) {
      return;
    }

    targetEl.addEventListener(type, _listener);

    return () => {
      targetEl.removeEventListener(type, _listener);
    };
  }, [_listener, el, type]);
}
