import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import vueEslintParser from 'vue-eslint-parser';
import eslintParserTypescript from '@typescript-eslint/parser';

const commonConfig = {
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module',  // Use ES modules
    },
  },
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting
  },
};

export default [
  {
    // Vue-specific configuration
    files: ['src/**/*.vue'],
    languageOptions: {
      ...commonConfig.languageOptions,
      parser: vueEslintParser, // Use Vue parser for .vue files
    },
    plugins: {
      ...commonConfig.plugins,
      vue: eslintPluginVue,
    },
  },
  {
    // TypeScript-specific configuration
    files: ['src/**/*.ts'],
    languageOptions: {
      ...commonConfig.languageOptions,
      parser: eslintParserTypescript, // Use TypeScript parser for .ts files
    },
    plugins: {
      ...commonConfig.plugins,
      '@typescript-eslint': eslintPluginTypescript, // Add TypeScript plugin
    },
    rules: {
      ...commonConfig.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional: for no explicit type checking
    },
  },
];
