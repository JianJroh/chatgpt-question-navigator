import { useEffect, useRef, MutableRefObject } from 'react';

type MaybeRefObject<T> = T | MutableRefObject<T>;

export function useMutationObserver(
  target: MaybeRefObject<HTMLElement | null | undefined>,
  callback: MutationCallback,
  options: MutationObserverInit
) {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    observer.current = new MutationObserver(callback);

    const targetEl = target && ('current' in target ? target.current : target);

    if (targetEl) {
      observer.current.observe(targetEl, options);
    }

    return () => {
      observer.current?.disconnect();
      observer.current = undefined;
    };
  }, [target, callback, options]);
}
