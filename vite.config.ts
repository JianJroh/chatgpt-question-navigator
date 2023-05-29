import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
    }),
    react(),
    monkey({
      entry: 'src/load.ts',
      userscript: {
        name: {
          '': 'ChatGPT Question Navigator',
          zh: 'ChatGPT 问题导航',
        },
        description: {
          '': 'It provides a convenient question sidebar directory for the ChatGPT official website. It automatically collects the questions asked by users on the current session page and displays them on the sidebar, enabling quick navigation to the location of historical questions.',
          zh: '为ChatGPT官网提供了一个便捷的问题侧边栏目录。它能够自动搜集当前会话页面的用户提的问题，并展示在侧边栏上，提供快速导航到历史问题的位置的能力。',
        },
        namespace: 'npm/chatgpt-question-navigator',
        match: ['https://chat.openai.com/**'],
        author: 'okokdi',
      },
    }),
  ],
});
