import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  // 忽略配置
  {
    ignores: ['**/assets/iconfont/iconfont.js', 'dist/**', '**/utils/Uri.ts', '**/utils/cesium-enhance.ts']
  },
  // 基础 JavaScript 规则
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: false
        }
      ],
      'prefer-arrow-callback': 'off'
    }
  },

  // 全局变量设置
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Vue自动导入的API
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        onBeforeUpdate: 'readonly',
        onUpdated: 'readonly',
        onActivated: 'readonly',
        onDeactivated: 'readonly',
        onErrorCaptured: 'readonly',
        onRenderTracked: 'readonly',
        onRenderTriggered: 'readonly',
        nextTick: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // Vue Router
        useRouter: 'readonly',
        useRoute: 'readonly',
        onBeforeRouteLeave: 'readonly',
        onBeforeRouteUpdate: 'readonly',
        // Pinia
        defineStore: 'readonly',
        storeToRefs: 'readonly',
        // 其他可能自动导入的API
        createApp: 'readonly',
        h: 'readonly',
        inject: 'readonly',
        provide: 'readonly'
      }
    }
  },

  // TypeScript 基础规则 (不需要类型检查)
  tseslint.configs.recommended,

  // TypeScript 规则配置
  {
    files: ['**/*.{ts,mts,cts,vue}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      // TypeScript 特定规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // [
      //   'warn',
      //   {
      //     ignoreRestArgs: true
      //   }
      // ]
      // 未使用变量的规则配置
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          // 忽略以下划线开头的参数
          argsIgnorePattern: '^_',
          // 忽略以下划线开头的变量
          varsIgnorePattern: '^_',
          // 忽略解构中未使用的变量
          destructuredArrayIgnorePattern: '^_',
          // 忽略剩余参数
          ignoreRestSiblings: true,
          // 仅检查使用的最后一个变量
          caughtErrors: 'none'
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // 添加更多TypeScript规则
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false
        }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true
        }
      ]
    }
  },
  // Storybook 规则配置
  {
    files: ['**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'],
    plugins: {
      storybook
    },
    rules: {
      // Storybook 特定规则
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/csf-component': 'warn',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'warn',
      'storybook/no-redundant-story-name': 'warn',
      'storybook/prefer-pascal-case': 'warn',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error'
    }
  },

  // Vue 规则配置
  pluginVue.configs['flat/essential'],
  pluginVue.configs['flat/strongly-recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Vue 特定规则
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 3 },
          multiline: { max: 1 }
        }
      ],
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/html-closing-bracket-spacing': [
        'error',
        {
          startTag: 'never',
          endTag: 'never',
          selfClosingTag: 'always'
        }
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/order-in-components': 'error',
      // 关闭Vue变量未定义的检查，因为我们使用了自动导入
      'vue/no-undef-properties': 'off',
      // 添加更多Vue规则
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always'
          }
        }
      ],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/no-template-shadow': 'error',
      'vue/this-in-template': ['error', 'never'],
      'vue/v-bind-style': ['error', 'shorthand'],
      'vue/v-on-style': ['error', 'shorthand'],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ]
    }
  },

  // 通用代码风格规则
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    rules: {
      // JavaScript 未使用变量规则 (对于非 TS 文件)
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ],
      // 环境相关规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // 代码质量规则
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-multi-spaces': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-useless-return': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'warn',

      // ES6+ 特性规则
      // 'arrow-spacing': ['error', { before: true, after: true }], // 与Prettier冲突，已由prettier接管
      'no-confusing-arrow': ['error', { allowParens: true }],
      'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': ['warn', 'always', { avoidQuotes: true }],
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'prefer-destructuring': [
        'warn',
        {
          array: false,
          object: true
        }
      ],

      // 格式化规则 - 以下规则与Prettier冲突，已由prettier接管
      // 'semi': ['error', 'never'],
      // 'quotes': ['error', 'single', { avoidEscape: true }],
      // 'indent': [
      //   'error',
      //   2,
      //   {
      //     SwitchCase: 1,
      //     VariableDeclarator: 'first',
      //     MemberExpression: 1,
      //     FunctionDeclaration: { parameters: 'first' },
      //     FunctionExpression: { parameters: 'first' },
      //     CallExpression: { arguments: 'first' }
      //   }
      // ],
      // 'comma-dangle': ['error', 'never'],
      // 'comma-spacing': ['error', { before: false, after: true }],
      // 'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      // 'keyword-spacing': ['error', { before: true, after: true }],
      // 'space-before-blocks': 'error',
      // 'space-before-function-paren': [
      //   'error',
      //   {
      //     anonymous: 'always',
      //     named: 'never',
      //     asyncArrow: 'always'
      //   }
      // ],
      // 'space-in-parens': ['error', 'never'],
      // 'space-infix-ops': 'error',
      // 'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      // 'curly': ['error', 'multi-line'],
      // 'eol-last': ['error', 'always'],
      // 'object-curly-spacing': ['error', 'always'],
      // 'array-bracket-spacing': ['error', 'never'],
      // 'arrow-parens': ['error', 'as-needed'],
      // 'max-lines': [
      //   'warn',
      //   {
      //     max: 500,
      //     skipBlankLines: true,
      //     skipComments: true
      //   }
      // ],
      'max-lines-per-function': [
        'warn',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true
        }
      ],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
      'max-nested-callbacks': ['warn', 4],
      // 导入排序规则
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // 不检查声明顺序
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true
        }
      ],
      // 关闭未定义变量检查，因为我们使用了自动导入
      'no-undef': 'off'
    }
  },

  // 测试文件特殊规则
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/tests/**/*.{js,ts}'],
    rules: {
      'no-unused-expressions': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off'
    }
  },

  // Prettier 配置 (放在最后以覆盖之前的规则)
  prettier
])
