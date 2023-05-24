import { useEffect, useState } from 'react';
import { queryChatContainer, queryQuestionEls } from '../helpers';
import { useEventListener } from './common/useEventListener';

export function useActiveQuestionIndex() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollContainer = queryChatContainer()!.parentElement!;

  const findActiveIndex = () => {
    const index = queryQuestionEls().findIndex((el) => el.getBoundingClientRect().top >= 0);
    if (index > -1) {
      setActiveIndex(index);
    }
  };

  useEventListener(scrollContainer, 'scroll', findActiveIndex);

  useEffect(() => {
    findActiveIndex();
  }, []);

  return activeIndex;
}
