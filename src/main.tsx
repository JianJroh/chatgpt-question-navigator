import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import baseStyle from './styles/index.css?inline';

const DOM_MARK = 'data-chatgpt-question-directory';

function mount(el: Element) {
  el.attachShadow({ mode: 'open' });
  const shadowRoot = el.shadowRoot!;

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(baseStyle);
  shadowRoot.adoptedStyleSheets = [sheet];

  ReactDOM.createRoot(shadowRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export function load() {
  if (document.querySelector(`[${DOM_MARK}]`)) {
    return;
  }
  const dom = document.createElement('div');
  dom.setAttribute(DOM_MARK, '');
  mount(dom);
  document.body.append(dom);
}
