import { useState } from 'react';
import { useMutationObserver } from './common/useMuationObserver';
import { getQuestions, queryChatContainer } from '../helpers';

export function useQuestions() {
  const [questions, setQuestions] = useState(getQuestions());

  const observer = useMutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        setQuestions(getQuestions());
      }
    }
  });

  const chatContainer = queryChatContainer();
  if (chatContainer) {
    observer.current?.observe(chatContainer, { childList: true });
  }

  return questions;
}
