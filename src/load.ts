import { load, remove } from './main.tsx';
import { queryChatContainer, queryQuestionEls } from './helpers';

let loaded = false;
let conversationId: string | null = null;

setInterval(() => {
  const latestConversationId = getConversationIdByUrl();

  const hasQuestion = queryChatContainer() != null && queryQuestionEls().length > 0;

  if (conversationId !== latestConversationId || !hasQuestion) {
    conversationId = latestConversationId;
    remove();
    loaded = false;
  }

  if (!loaded && hasQuestion) {
    load();
    loaded = true;
  }
}, 600);

function getConversationIdByUrl() {
  const res = location.pathname.match(/\/c\/(.*)/);
  return res?.[1] ?? null;
}
