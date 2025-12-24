# ESLint 配置说明

## 项目配置

本项目使用了针对 Nuxt 3 + TypeScript 项目优化的 ESLint 配置。

## 配置特点

- 基于 Nuxt 官方 ESLint 配置
- 支持 Vue 3 语法和最佳实践
- 适配 TypeScript 项目
- 包含代码质量检查和格式化规则

## 主要规则

### 通用规则
- 生产环境警告 `console` 和 `debugger`
- 推荐使用 `const` 而非 `let`

### Vue 特定规则
- 检查 `v-for` key 必需性
- 验证 `v-for` 和 `v-on` 语法
- 防止 `v-if` 和 `v-for` 同时使用
- 警告使用 `v-html`（安全考虑）

### TypeScript 支持
- 自动忽略 TypeScript 语法解析问题
- 使用 `@ts-ignore` 注释来处理复杂类型

## 使用方法

### 检查代码问题
```bash
pnpm run lint
```

### 自动修复问题
```bash
pnpm run lint:fix
```

## 忽略的文件/目录

以下文件和目录会被 ESLint 自动忽略：
- `.nuxt/` - Nuxt 构建目录
- `.output/` - 构建输出目录
- `dist/` - 分发目录
- `node_modules/` - 依赖目录
- `*.min.js` - 压缩的 JavaScript 文件
- `public/` - 静态资源目录

## 注意事项

1. 在使用复杂 TypeScript 类型注解时，如果遇到解析错误，可以使用 `@ts-ignore` 注释
2. 对于 Vue 3 的多根节点模板，配置已自动兼容
3. 配置会在编辑器中运行时自动禁用部分规则以提升性能

## 自定义规则

可以在 `eslint.config.ts` 中修改规则来满足项目特定需求。