// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default withNuxt(
  // ✅ 专门给 .vue 文件用的 parser 配置
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

  // 你原来的规则配置（可以原封不动）
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',

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
