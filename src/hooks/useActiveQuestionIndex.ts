import { useEffect, useState } from 'react';
import { queryChatContainer, queryQuestionEls } from '../helpers';
import { useEventListener } from './common/useEventListener';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';
import { isSharePage, scrollMarginTop } from '../helpers/sharePage';

const topThreshold = isSharePage ? scrollMarginTop : 0;

export function useActiveQuestionIndex() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollContainer = useMountedCallbackValue(() => queryChatContainer()?.parentElement);

  const findActiveIndex = () => {
    const questionEls = queryQuestionEls();
    const index = questionEls.findIndex((el) => el.getBoundingClientRect().top >= topThreshold);
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
