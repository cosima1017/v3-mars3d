export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    // 'stylelint-config-tailwindcss'
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'no-empty-source': null,
    'at-rule-no-deprecated': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return',
          'theme',
          'variant',
          'custom-variant'
        ],
      },
    ],
    'scss/operator-no-newline-after': null,
    'scss/load-partial-extension': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return',
          'theme',
          'variant',
          'custom-variant'
        ],
      },
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/']
      }
    ],
    // 限制ID选择器使用
    'selector-max-id': 1,
    // 限制嵌套深度
    'max-nesting-depth': 4,
    // 禁止重复的选择器
    'no-duplicate-selectors': true,
    // 禁止空块
    'block-no-empty': true,
    // SCSS变量命名规范
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9]+$',
    // 确保@import规则放在其他规则之前
    'scss/at-import-partial-extension': null,
    // 确保@extend规则放在属性声明之前
    'scss/at-extend-no-missing-placeholder': null,
    // 禁止在@mixin中使用!important
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    // 允许在@mixin名称中使用连字符
    'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'src/assets/iconfont/**/*'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
}
