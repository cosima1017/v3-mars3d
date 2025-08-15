### 项目初始化

```bash
$ pnpm install
```

### 运行项目

```bash
$ pnpm dev
```

### 构建项目

```bash
$ pnpm build
```

### eslint格式化

```bash
$ pnpm lint
# fix
$ pnpm lint:fix
```

### git 提交

```bash
# 不想用默认的git提交，请使用pnpm commit
$ pnpm commit
```

### 插件库

- unplugin-vue-router：基于文件系统的路由自动生成
- vite-plugin-vue-layouts：页面布局系统
- unplugin-auto-import：自动导入API
- unplugin-vue-components：组件自动导入
- vite-plugin-vue-devtools：Vue开发工具增强
- vite-plugin-compression：资源压缩
- unocss：原子化CSS引擎
- vite-plugin-inspect：浏览器查看打包资源占比分析
- vite-plugin-html：HTML模板
- vite-plugin-checker：错误检查

### 常用git提交类型

| 类型     | 说明                                |
| -------- | ----------------------------------- |
| feat     | 新功能                              |
| fix      | 修复 bug                            |
| docs     | 文档更新                            |
| style    | 格式（不影响代码运行的变动）        |
| refactor | 重构（既不是新增功能也不是修复bug） |
| test     | 增加测试                            |
| chore    | 构建过程或辅助工具变动              |
