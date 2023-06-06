import { load, remove } from './main.tsx';
import { queryChatContainer, queryQuestionEls } from './helpers';
import { isSharePage, scrollMarginTop } from './helpers/sharePage.ts';

let loaded = false;
let conversationId: string | null = null;

setInterval(() => {
  const latestConversationId = getConversationIdByUrl();

  const questionEls = (queryChatContainer() && queryQuestionEls()) ?? [];

  const hasQuestion = questionEls.length > 0;

  if (conversationId !== latestConversationId || !hasQuestion) {
    conversationId = latestConversationId;
    remove();
    loaded = false;
  }

  if (!loaded && hasQuestion) {
    load();
    loaded = true;
    if (isSharePage) {
      questionEls.forEach((q) => {
        q.style.scrollMarginTop = scrollMarginTop + 'px';
      });
    }
  }
}, 600);

function getConversationIdByUrl() {
  const res = location.pathname.match(/\/c\/(.*)/);
  return res?.[1] ?? null;
}
