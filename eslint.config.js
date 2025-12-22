// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // ========================
  // 忽略文件
  // ========================
  {
    ignores: ['node_modules/**', 'dist/**', 'public/**'],
  },

  // ========================
  // eslint:recommended
  // ========================
  js.configs.recommended,

  // ========================
  // Vue 3 essential
  // ========================
  vue.configs['flat/essential'],

  // ========================
  // TypeScript 推荐规则（⚠ 已包含插件注册）
  // ========================
  ...tseslint.configs.recommended,

  // ========================
  // 通用语言选项
  // ========================
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // ========================
  // Vue + TS 解析 & 自定义规则
  // ========================
  {
    files: ['src/**/*{.vue,js,ts}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      /* ========= ESLint ========= */
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',

      /* ========= TypeScript ========= */
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      /* ========= Vue ========= */
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',

      /* ========= Prettier ========= */
      'prettier/prettier': 'error',
    },
  },
])
