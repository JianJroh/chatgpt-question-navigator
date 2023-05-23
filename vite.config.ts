import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
    }),
    react({ include: ['**/*.tsx'] }),
  ],
  server: {
    open: 'playground/example.html',
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/load.ts'),
      output: {
        format: 'iife',
        entryFileNames: 'chatgpt-question-directory.js',
      },
    },
  },
});
