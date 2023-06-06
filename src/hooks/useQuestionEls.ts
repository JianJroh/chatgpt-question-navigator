import { useMemo, useState } from 'react';
import { useMutationObserver } from './common/useMuationObserver';
import { queryChatContainer, queryQuestionEls } from '../helpers';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';

export function useQuestionEls() {
  const [questionEls, setQuestionEls] = useState(queryQuestionEls());

  const questions = useMemo(() => questionEls.map((q) => q.innerText.trim() ?? ''), [questionEls]);

  const chatContainer = useMountedCallbackValue(queryChatContainer);

  useMutationObserver(
    chatContainer,
    (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          setQuestionEls(queryQuestionEls());
        }
      }
    },
    {
      childList: true,
    }
  );

  return { questionEls, questions };
}
