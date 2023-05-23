import { defineConfig, presetUno, presetAttributify } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetScrollbar()],
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      brandPrimary: '#19c37d',
      grayPrimary: '#6e6e80',
    },
  },
});
