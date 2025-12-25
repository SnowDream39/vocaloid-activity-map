// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default withNuxt(
    // ① 给 .vue 文件用 parser
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
    // ② 只对 .vue 文件关闭 any 限制
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // ③ 全局规则

  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-v-for-key': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-on': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      
      'no-unused-vars': 'off',
      'prefer-const': 'error',
    },

    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      '*.min.js',
      'public/**',
    ],
  }
)
