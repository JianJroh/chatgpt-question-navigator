import { useState } from 'react';
import { useMutationObserver } from './common/useMuationObserver';
import { getQuestions, queryChatContainer } from '../helpers';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';

export function useQuestions() {
  const [questions, setQuestions] = useState(getQuestions());

  const chatContainer = useMountedCallbackValue(queryChatContainer);

  useMutationObserver(
    chatContainer,
    (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          setQuestions(getQuestions());
        }
      }
    },
    {
      childList: true,
    }
  );

  return questions;
}
