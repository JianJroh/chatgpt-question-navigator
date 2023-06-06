import { useEffect, useState, useCallback } from 'react';
import { queryChatContainer } from '../helpers';
import { useEventListener } from './common/useEventListener';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';
import { isSharePage, scrollMarginTop } from '../helpers/sharePage';
import { useQuestionEls } from './useQuestionEls';

const topThreshold = isSharePage ? scrollMarginTop : 0;

export function useActiveQuestionIndex() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { questionEls } = useQuestionEls();
  const scrollContainer = useMountedCallbackValue(() => queryChatContainer()?.parentElement);

  const findActiveIndex = useCallback(() => {
    const index = questionEls.findIndex((el) => el.getBoundingClientRect().top >= topThreshold);
    if (index > -1) {
      setActiveIndex(index);
    }
  }, [questionEls]);

  useEventListener(scrollContainer, 'scroll', findActiveIndex);

  useEffect(() => {
    findActiveIndex();
  }, [findActiveIndex]);

  return activeIndex;
}
