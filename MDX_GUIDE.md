# MDX 支持指南

本项目已成功添加了 MDX 支持，允许您使用 Markdown 语法编写文章，同时支持 React 组件和自定义样式。

## 功能特性

- ✅ 支持标准 Markdown 语法
- ✅ 支持 React 组件嵌入
- ✅ 自定义 MDX 组件样式
- ✅ 与现有硬编码文章共存
- ✅ 自动排序和分页
- ✅ 完整的 TypeScript 支持

## 文件结构

```
content/
  posts/
    spring-morning.mdx      # MDX 文章示例
    coffee-philosophy.mdx   # MDX 文章示例
```

## 创建新的 MDX 文章

1. 在 `content/posts/` 目录下创建新的 `.mdx` 文件
2. 使用以下 frontmatter 格式：

```mdx
---
title: "文章标题"
date: "2025年1月20日"
excerpt: "文章摘要，用于首页显示..."
image: "https://example.com/image.jpg"
tags: ["标签1", "标签2"]
---

# 文章内容

这里是文章的主体内容，支持所有 Markdown 语法。

## 二级标题

- 列表项 1
- 列表项 2

> 引用文本

**粗体文本** 和 *斜体文本*

### 代码块

```javascript
console.log("Hello, MDX!");
```

## 支持的 Markdown 语法

### 标题
- `# 一级标题`
- `## 二级标题`
- `### 三级标题`

### 文本格式
- `**粗体**`
- `*斜体*`
- `~~删除线~~`

### 列表
- 无序列表：`- 项目`
- 有序列表：`1. 项目`

### 引用
- `> 引用文本`

### 代码
- 行内代码：`` `代码` ``
- 代码块：``` ``` ```

### 链接和图片
- 链接：`[文本](URL)`
- 图片：`![alt](URL)`

### 分割线
- `---`

## 自定义样式

MDX 组件使用与现有文章相同的样式系统，确保视觉一致性：

- 标题使用 `font-serif` 字体
- 正文使用 `text-stone-700` 颜色
- 引用使用左边框样式
- 代码块使用灰色背景

## 与现有文章的兼容性

- MDX 文章和硬编码文章可以共存
- 所有文章按日期自动排序
- 分页功能支持混合内容
- 文章详情页面自动检测内容类型

## 技术实现

### 核心文件
- `app/lib/mdx.ts` - MDX 文件处理逻辑
- `app/components/MDXComponents.tsx` - 自定义 MDX 组件
- `app/posts/[slug]/page.tsx` - 文章详情页面
- `next.config.ts` - Next.js MDX 配置

### 依赖包
- `@next/mdx` - Next.js MDX 支持
- `@mdx-js/react` - MDX React 组件
- `next-mdx-remote` - 远程 MDX 渲染
- `gray-matter` - Frontmatter 解析

## 示例文章

### spring-morning.mdx
展示了基本的 Markdown 语法使用，包括标题、列表、引用等。

### coffee-philosophy.mdx
展示了更复杂的内容结构，包括代码块、嵌套列表等。

## 注意事项

1. **文件命名**：使用小写字母和连字符，如 `my-article.mdx`
2. **Frontmatter**：必须包含 `title`、`date`、`excerpt` 字段
3. **图片**：建议使用外部图片 URL 或 Next.js Image 组件
4. **代码块**：支持语法高亮，指定语言如 ```javascript

## 故障排除

### 常见问题

1. **构建错误**：确保 MDX 文件语法正确
2. **样式问题**：检查 Tailwind CSS 类名
3. **图片不显示**：验证图片 URL 可访问性

### 调试技巧

- 使用 `npm run dev` 启动开发服务器
- 检查浏览器控制台错误信息
- 验证 MDX 文件语法

## 未来扩展

- 支持更多 MDX 插件
- 添加文章分类功能
- 实现搜索功能
- 支持评论系统

---

通过 MDX 支持，您现在可以更灵活地创建和编辑文章内容，同时保持项目的整体设计风格和用户体验。 