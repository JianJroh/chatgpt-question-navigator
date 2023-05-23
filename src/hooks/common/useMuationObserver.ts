import { useEffect, useRef } from 'react';

export function useMutationObserver(cb: MutationCallback) {
  const ob = useRef<MutationObserver>();
  useEffect(() => {
    ob.current = new MutationObserver(cb);
    return () => {
      ob.current?.disconnect();
    };
  });
  return ob;
}
