import { type RefObject, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useHovering<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const elRef = useRef<T>(null);
  const [hovering, setHovering] = useState(false);

  useEventListener(elRef, 'mouseenter', () => {
    setHovering(true);
  });

  useEventListener(elRef, 'mouseleave', () => {
    setHovering(false);
  });

  return [elRef, hovering];
}
