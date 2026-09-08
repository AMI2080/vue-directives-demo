import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  eslintPluginTailwindcss.configs.recommended,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: './src/assets/main.css',
      },
    },
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    },
  },
  skipFormatting
);
