# MDX & Markdown 使用指南

本指南介绍如何在云舒亭博客中使用 MDX 和 Markdown 格式编写文章。

## 📝 支持的格式

项目支持两种内容格式：

### 1. MDX 格式 (`.mdx`)
- 支持所有标准 Markdown 语法
- 可以在文章中使用 React 组件
- 支持 JSX 语法
- 适合需要交互式内容的文章

### 2. Markdown 格式 (`.md`)
- 标准 Markdown 语法
- 轻量级，适合纯文本内容
- 更好的编辑器支持
- 适合简单的文章内容

## 🗂️ 文件组织

### 目录结构
```
content/
└── posts/
    ├── spring-morning.mdx      # MDX 格式文章
    ├── coffee-philosophy.mdx   # MDX 格式文章
    └── my-article.md           # Markdown 格式文章
```

### 文件命名规则
- 使用描述性的文件名
- 使用连字符分隔单词
- 避免使用中文文件名
- 文件扩展名：`.mdx` 或 `.md`

## 📋 前置元数据 (Frontmatter)

所有文章文件都需要包含前置元数据，格式如下：

```yaml
---
title: "文章标题"
date: "2025年1月21日"
excerpt: "文章摘要，用于首页和列表页显示"
image: "https://example.com/image.jpg"
tags: ["标签1", "标签2", "标签3"]
---
```

### 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `date` | string | ✅ | 发布日期 |
| `excerpt` | string | ✅ | 文章摘要 |
| `image` | string | ❌ | 特色图片URL |
| `tags` | array | ❌ | 标签数组 |

## ✍️ 写作语法

### 基础 Markdown 语法

#### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

#### 文本格式
```markdown
**粗体文本**
*斜体文本*
`行内代码`
~~删除线~~
```

#### 列表
```markdown
# 无序列表
- 第一项
- 第二项
- 第三项

# 有序列表
1. 第一步
2. 第二步
3. 第三步
```

#### 链接和图片
```markdown
[链接文本](https://example.com)
![图片描述](https://example.com/image.jpg)
```

#### 引用
```markdown
> 这是一个引用块
> 可以包含多行内容
```

#### 代码块
```markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
```

#### 分隔线
```markdown
---
```

### MDX 特有功能

#### 使用 React 组件
```mdx
---
title: "使用组件的文章"
date: "2025年1月21日"
excerpt: "展示如何在MDX中使用React组件"
---

# 使用组件的文章

这是一个普通的段落。

<MyCustomComponent prop="value" />

继续写文章内容...
```

#### 导入组件
```mdx
import MyComponent from '../components/MyComponent'

# 文章标题

<MyComponent />
```

## 🎨 样式和主题

### 自动样式
所有 Markdown 内容都会自动应用以下样式：

- **标题**: 使用 Noto Serif SC 字体，不同级别有不同的字体大小
- **段落**: 使用 Noto Sans SC 字体，适当的行高和间距
- **代码**: 灰色背景，圆角边框
- **引用**: 左边框，斜体样式
- **列表**: 适当的缩进和间距

### 自定义样式
如果需要自定义样式，可以在 `app/components/MDXComponents.tsx` 或 `app/components/MarkdownRenderer.tsx` 中修改组件样式。

## 📱 响应式设计

所有内容都会自动适配不同屏幕尺寸：

- **桌面端**: 最大宽度限制，居中显示
- **平板端**: 适当缩小字体和间距
- **手机端**: 单列布局，优化触摸体验

## 🔧 技术实现

### 文件处理流程
1. 系统扫描 `content/posts/` 目录
2. 读取所有 `.mdx` 和 `.md` 文件
3. 解析前置元数据
4. 根据文件类型选择渲染器
5. 生成静态页面

### 渲染器选择
- `.mdx` 文件 → MDXRemote 渲染器
- `.md` 文件 → ReactMarkdown 渲染器
- 硬编码文章 → 原有渲染方式

## 📝 最佳实践

### 内容组织
1. **使用清晰的标题结构**
2. **保持段落简短易读**
3. **适当使用列表和引用**
4. **添加相关图片增强视觉效果**

### 文件管理
1. **使用描述性的文件名**
2. **保持文件结构整洁**
3. **定期备份重要内容**
4. **使用版本控制管理内容**

### 性能优化
1. **压缩图片文件**
2. **使用合适的图片格式**
3. **避免过大的文件**
4. **合理使用标签分类**

## 🚀 快速开始

### 创建新文章
1. 在 `content/posts/` 目录中创建新文件
2. 添加前置元数据
3. 编写文章内容
4. 保存文件
5. 刷新浏览器查看效果

### 示例文章
```mdx
---
title: "我的第一篇文章"
date: "2025年1月21日"
excerpt: "这是我的第一篇文章，介绍如何使用MDX编写内容。"
image: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg"
tags: ["教程", "MDX", "博客"]
---

# 我的第一篇文章

欢迎来到我的博客！这是使用 MDX 格式编写的第一篇文章。

## 为什么选择 MDX？

MDX 让我可以在 Markdown 中使用 React 组件，这为我的博客带来了无限的可能性。

### 主要优势

- **灵活性**: 可以混合使用 Markdown 和 React 组件
- **可扩展性**: 轻松添加交互式内容
- **一致性**: 与现有的 React 生态系统完美集成

## 代码示例

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## 总结

MDX 是一个强大的工具，让我能够创建丰富而有趣的博客内容。

---

*感谢阅读我的第一篇文章！*
```

## 🔍 故障排除

### 常见问题

1. **文章不显示**
   - 检查文件名是否正确
   - 确认前置元数据格式正确
   - 验证文件保存在正确目录

2. **样式不正确**
   - 检查 Markdown 语法
   - 确认组件导入正确
   - 查看浏览器控制台错误

3. **图片不显示**
   - 检查图片URL是否有效
   - 确认图片格式支持
   - 验证网络连接

### 调试技巧
- 使用浏览器开发者工具检查元素
- 查看控制台错误信息
- 检查文件语法是否正确
- 验证前置元数据格式

## 📚 更多资源

- [MDX 官方文档](https://mdxjs.com/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Next.js MDX 集成](https://nextjs.org/docs/advanced-features/using-mdx)
- [React Markdown 文档](https://github.com/remarkjs/react-markdown)

---

*Happy Writing! 🎉* 