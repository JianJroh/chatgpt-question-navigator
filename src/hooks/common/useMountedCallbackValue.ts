import { useCallback, useEffect, useRef } from 'react';

export function useMountedCallbackValue<T>(cb: () => T) {
  const value = useRef<T>();

  const callback = useCallback(cb, [cb]);

  useEffect(() => {
    value.current = callback();
  }, [callback]);

  return value;
}
