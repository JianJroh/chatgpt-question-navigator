import { type MutableRefObject, useCallback, useEffect } from 'react';

type MaybeRefObject<T> = T | MutableRefObject<T>;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: MaybeRefObject<HTMLElement | null | undefined>,
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
    const targetEl = target && ('current' in target ? target.current : target);

    if (!targetEl) {
      return;
    }

    targetEl.addEventListener(type, _listener);

    return () => {
      targetEl.removeEventListener(type, _listener);
    };
  }, [_listener, target, type]);
}
