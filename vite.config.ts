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
        name: 'chatGPT official website sidebar question directory',
        namespace: 'chatgpt-question-directory',
        match: ['https://chat.openai.com/**'],
        author: 'okokdi',
      },
    }),
  ],
});
