# 技术文档

本文档详细介绍了云舒亭博客的技术架构、实现细节和开发指南。

## 🏗️ 技术架构

### 核心技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Google Fonts (Noto Sans SC, Noto Serif SC)
- **内容管理**: MDX + Markdown
- **构建工具**: Turbopack (开发环境)

### 项目结构

```
moment-herman-blog/
├── app/                          # Next.js App Router 目录
│   ├── components/               # React 组件
│   │   ├── Header.tsx           # 导航头部
│   │   ├── Footer.tsx           # 页面底部
│   │   ├── PostCard.tsx         # 文章卡片组件
│   │   ├── MDXComponents.tsx    # MDX 自定义组件
│   │   ├── MarkdownRenderer.tsx # Markdown 渲染器
│   │   ├── HomeClient.tsx       # 首页客户端逻辑
│   │   └── OrigamiBackground.tsx # 背景动画组件
│   ├── lib/                     # 工具函数和数据处理
│   │   ├── posts.ts             # 硬编码文章数据
│   │   └── mdx.ts               # MDX/Markdown 处理
│   ├── posts/[slug]/            # 动态文章页面
│   │   └── page.tsx             # 文章详情页面
│   ├── writings/                # 文章列表页面
│   ├── gallery/                 # 图片画廊页面
│   ├── about/                   # 关于页面
│   ├── layout.tsx               # 根布局
│   ├── page.tsx                 # 首页
│   └── globals.css              # 全局样式
├── content/                     # 内容文件
│   └── posts/                   # MDX/Markdown 文章
├── public/                      # 静态资源
├── types/                       # TypeScript 类型定义
│   └── mdx.d.ts                 # MDX 类型声明
├── next.config.ts               # Next.js 配置
├── tailwind.config.ts           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖
```

## 🔧 核心功能实现

### 1. 内容管理系统

#### 文件处理架构
```typescript
// app/lib/mdx.ts
export async function getMarkdownPostBySlug(slug: string): Promise<MarkdownPost | null> {
  // 1. 尝试查找 .mdx 文件
  // 2. 如果不存在，尝试查找 .md 文件
  // 3. 解析 frontmatter 和内容
  // 4. 返回标准化的文章对象
}
```

#### 渲染器选择逻辑
```typescript
// app/posts/[slug]/page.tsx
const isMDX = markdownPost && slug.includes('.mdx');
const isMarkdown = markdownPost && !isMDX;

{isMDX ? (
  <MDXRemote source={post.content} components={MDXComponents} />
) : isMarkdown ? (
  <MarkdownRenderer content={post.content} />
) : (
  // 硬编码内容渲染
)}
```

### 2. 样式系统

#### Tailwind CSS 配置
```typescript
// tailwind.config.ts
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-sc)'],
        serif: ['var(--font-noto-serif-sc)'],
      },
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          // ... 更多颜色
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
```

#### 组件样式规范
```typescript
// 标题样式
const titleStyles = "font-serif text-3xl sm:text-4xl mt-4 leading-tight text-stone-800";

// 段落样式
const paragraphStyles = "mb-4 text-stone-700 leading-relaxed";

// 代码块样式
const codeStyles = "bg-stone-100 px-2 py-1 rounded text-sm font-mono text-stone-800";
```

### 3. 响应式设计

#### 断点系统
- `sm`: 640px 及以上
- `md`: 768px 及以上
- `lg`: 1024px 及以上
- `xl`: 1280px 及以上

#### 布局适配
```typescript
// 容器宽度
const containerStyles = "container mx-auto max-w-6xl px-4 sm:px-8";

// 网格布局
const gridStyles = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

// 字体大小
const textStyles = "text-lg sm:text-xl lg:text-2xl";
```

## 📊 数据流

### 1. 文章数据流

```
content/posts/*.{mdx,md}
    ↓
getAllMarkdownPosts()
    ↓
合并硬编码文章数据
    ↓
按日期排序
    ↓
传递给组件渲染
```

### 2. 页面渲染流程

```
用户访问 /posts/[slug]
    ↓
generateStaticParams() 生成静态路径
    ↓
getMarkdownPostBySlug() 获取文章数据
    ↓
根据文件类型选择渲染器
    ↓
渲染页面内容
```

## 🔍 性能优化

### 1. 静态生成 (SSG)
- 所有页面在构建时预渲染
- 使用 `generateStaticParams` 生成静态路径
- 减少运行时计算

### 2. 图片优化
- 使用外部图片服务 (Pexels)
- 自动压缩和格式优化
- 响应式图片加载

### 3. 代码分割
- 组件级别的代码分割
- 动态导入非关键组件
- 减少初始包大小

### 4. 缓存策略
- 静态资源长期缓存
- 内容更新时重新构建
- CDN 缓存优化

## 🛠️ 开发指南

### 环境设置

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **构建生产版本**
```bash
npm run build
```

4. **启动生产服务器**
```bash
npm start
```

### 代码规范

#### TypeScript 配置
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  }
}
```

#### 组件开发规范
```typescript
// 1. 使用 TypeScript 接口定义 Props
interface ComponentProps {
  title: string;
  content: string;
  optional?: boolean;
}

// 2. 使用函数组件和 React.FC
const MyComponent: React.FC<ComponentProps> = ({ title, content, optional = false }) => {
  return (
    <div className="component-styles">
      <h1>{title}</h1>
      <p>{content}</p>
      {optional && <span>Optional content</span>}
    </div>
  );
};

// 3. 导出组件
export default MyComponent;
```

### 测试策略

#### 单元测试
```typescript
// 测试文件命名: ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" content="Content" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

#### 集成测试
- 测试页面路由
- 测试数据获取
- 测试用户交互

## 🔧 部署配置

### Vercel 部署
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 环境变量
```bash
# 开发环境
NODE_ENV=development

# 生产环境
NODE_ENV=production
```

## 📈 监控和分析

### 性能监控
- Core Web Vitals 监控
- 页面加载时间
- 用户交互响应时间

### 错误追踪
- 客户端错误日志
- 服务器端错误日志
- 构建错误通知

## 🔮 未来规划

### 短期目标
- [ ] 添加文章搜索功能
- [ ] 实现文章分类和标签系统
- [ ] 添加评论系统
- [ ] 优化图片加载性能

### 长期目标
- [ ] 实现多语言支持
- [ ] 添加用户认证系统
- [ ] 实现内容管理系统 (CMS)
- [ ] 添加分析仪表板

## 📚 参考资料

- [Next.js 官方文档](https://nextjs.org/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 官方文档](https://mdxjs.com/)
- [React 官方文档](https://react.dev/)

---

*本文档会随着项目发展持续更新。* 