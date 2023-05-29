import { useEffect, useRef } from 'react';

export function useMountedCallbackValue<T>(cb: () => T) {
  const value = useRef<T>();

  useEffect(() => {
    value.current = cb();
  });

  return value;
}
