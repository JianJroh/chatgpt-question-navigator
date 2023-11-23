export function queryChatContainer() {
  const CHAT_LIST_EL_CLASS = 'flex flex-col text-sm';
  return document
    .querySelector('main')
    ?.querySelector<HTMLDivElement>(className2Selector(CHAT_LIST_EL_CLASS));
}

export function queryQuestionEls() {
  return Array.from((queryChatContainer()?.children ?? []) as HTMLDivElement[])
    .filter((child) => child.hasAttribute('data-testid'))
    .filter((_, index) => index % 2 === 0);
}

export function className2Selector(className: string) {
  return className
    .split(' ')
    .map((cl) => '.' + cl)
    .join('');
}
