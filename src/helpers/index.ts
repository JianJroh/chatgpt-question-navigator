export function queryChatContainer() {
  const CHAT_LIST_EL_CLASS = 'flex flex-col text-sm';
  return document
    .querySelector('main')
    ?.querySelector<HTMLDivElement>(className2Selector(CHAT_LIST_EL_CLASS));
}

export function queryQuestionEls() {
  const CHAT_ITEM_EL_CLASS = 'group';
  return Array.from((queryChatContainer()?.children ?? []) as HTMLDivElement[]).reduce<
    HTMLDivElement[]
  >((questions, child, index) => {
    if (child.classList.contains(CHAT_ITEM_EL_CLASS) && index % 2 === 0) {
      questions.push(child);
    }
    return questions;
  }, []);
}

export function className2Selector(className: string) {
  return className
    .split(' ')
    .map((cl) => '.' + cl)
    .join('');
}
