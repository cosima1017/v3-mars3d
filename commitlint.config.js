export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档修改
        'style', // 代码格式修改，不影响代码逻辑
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI配置相关
        'chore', // 其他修改
        'revert' // 回滚提交
      ]
    ],
    'type-case': [2, 'always', 'lowerCase'], // 类型小写
    'type-empty': [2, 'never'], // 类型不能为空
    'subject-empty': [2, 'never'], // 标题不能为空
    'subject-full-stop': [2, 'never', '.'], // 标题末尾不能有句号
    'subject-case': [0, 'never'], // 标题首字母大写
    'header-max-length': [2, 'always', 72] // 标题最大长度为72
  }
}
