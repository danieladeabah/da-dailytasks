import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'
import vueEslintParser from 'vue-eslint-parser'
import eslintParserTypescript from '@typescript-eslint/parser'

export default [
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier // Prettier plugin
    },
    rules: {
      'prettier/prettier': 'error' // Enforce Prettier formatting
    }
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: eslintParserTypescript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier // Prettier plugin
    },
    rules: {
      'prettier/prettier': 'error' // Enforce Prettier formatting
    }
  }
]
