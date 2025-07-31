# 技术文档

本文档详细介绍了云舒亭博客的技术架构、实现细节和开发指南。

## 🏗️ 技术架构

### 核心技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + CSS Variables
- **主题管理**: next-themes
- **字体**: Google Fonts (Noto Sans SC, Noto Serif SC)
- **内容管理**: MDX + Markdown
- **动画**: HTML5 Canvas + CSS Animations
- **构建工具**: Turbopack (开发环境)

### 项目结构

```
moment-herman-blog/
├── app/                          # Next.js App Router 目录
│   ├── components/               # React 组件
│   │   ├── Header.tsx           # 导航头部 (含主题切换)
│   │   ├── Footer.tsx           # 页面底部
│   │   ├── PostCard.tsx         # 文章卡片组件
│   │   ├── MDXComponents.tsx    # MDX 自定义组件 (主题感知)
│   │   ├── MarkdownRenderer.tsx # Markdown 渲染器
│   │   ├── HomeClient.tsx       # 首页客户端逻辑
│   │   ├── ThemeToggle.tsx      # 主题切换按钮
│   │   ├── ThemeProvider.tsx    # 主题提供者
│   │   ├── GlobalLoader.tsx     # 全局加载动画
│   │   ├── OrigamiBackground.tsx # 浅色模式背景动画
│   │   └── FireflyBackground.tsx # 深色模式背景动画
│   ├── lib/                     # 工具函数和数据处理
│   │   ├── posts.ts             # 文章数据管理 (文件系统 + 硬编码)
│   │   └── mdx.ts               # MDX/Markdown 处理
│   ├── posts/[slug]/            # 动态文章页面
│   │   └── page.tsx             # 文章详情页面
│   ├── writings/                # 文章列表页面
│   ├── gallery/                 # 图片画廊页面
│   ├── about/                   # 关于页面
│   ├── layout.tsx               # 根布局 (含主题提供者和全局加载器)
│   ├── page.tsx                 # 首页
│   └── globals.css              # 全局样式和CSS变量
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

## 🌙 主题系统架构

### 1. 主题管理实现

#### next-themes 集成
```typescript
// app/components/ThemeProvider.tsx
import { NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

#### 主题切换组件
```typescript
// app/components/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-foreground hover:text-primary transition-colors"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

### 2. CSS 变量系统

#### 颜色变量定义
```css
/* app/globals.css */
:root {
  /* 浅色模式 */
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-card: #f8f9fa;
  --color-card-foreground: #1a1a1a;
  --color-primary: #a1887f;
  --color-primary-foreground: #ffffff;
  --color-muted: #6c757d;
  --color-muted-foreground: #6c757d;
  --color-border: #e9ecef;
  --color-accent: #f8f9fa;
}

.dark {
  /* 深色模式 */
  --color-background: #0f172a;
  --color-foreground: #f1f5f9;
  --color-card: #1e293b;
  --color-card-foreground: #f1f5f9;
  --color-primary: #a1887f;
  --color-primary-foreground: #ffffff;
  --color-muted: #94a3b8;
  --color-muted-foreground: #94a3b8;
  --color-border: #334155;
  --color-accent: #1e293b;
}
```

#### Tailwind 配置映射
```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
      }
    }
  }
}
```

## 🎭 动画系统

### 1. 背景动画实现

#### 浅色模式 - 折纸鸟动画
```typescript
// app/components/OrigamiBackground.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export default function OrigamiBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => setMounted(true), []);
  
  // 只在浅色模式且已挂载时渲染
  if (!mounted || theme !== 'light') return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 折纸鸟动画逻辑
    const birds: Bird[] = [];
    
    function animate() {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制每只鸟
      birds.forEach(bird => {
        bird.update();
        bird.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    }

    animate();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
```

#### 深色模式 - 萤火虫动画
```typescript
// app/components/FireflyBackground.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export default function FireflyBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => setMounted(true), []);
  
  // 只在深色模式且已挂载时渲染
  if (!mounted || theme !== 'dark') return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 萤火虫动画逻辑
    const fireflies: Firefly[] = [];
    let mouseX = 0, mouseY = 0;

    // 鼠标交互
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      fireflies.forEach(firefly => {
        firefly.update(mouseX, mouseY);
        firefly.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    }

    animate();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
```

### 2. 加载动画系统

#### 全局加载器
```typescript
// app/components/GlobalLoader.tsx
'use client';
import { useState, useEffect } from 'react';

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // 预加载关键图片
    const heroImage = new Image();
    heroImage.onload = () => setImageLoaded(true);
    heroImage.src = 'https://picsum.photos/1920/1080';

    // 模拟内容准备
    const timer = setTimeout(() => setContentReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (imageLoaded && contentReady) {
      const timer = setTimeout(() => setIsFullyLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded, contentReady]);

  return (
    <>
      {!isFullyLoaded && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          {/* SVG 加载动画 */}
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 100 100">
              {/* 动画路径 */}
            </svg>
            <p className="text-foreground/80">Loading...</p>
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-1000 ${isFullyLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}
```

## 🔧 核心功能实现

### 1. 内容管理系统

#### 统一文章数据管理
```typescript
// app/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 从文件系统获取文章
export function getPostsFromFilesystem(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames
    .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: filename.replace(/\.(mdx|md)$/, ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        image: data.image,
        slug: filename.replace(/\.(mdx|md)$/, ''),
        tags: data.tags || []
      };
    });
}

// 合并文件系统和硬编码文章
export function getAllPosts(): Post[] {
  const filesystemPosts = getPostsFromFilesystem();
  const hardcodedPosts = getHardcodedPosts();
  
  // 合并并去重 (文件系统优先)
  const allPosts = [...filesystemPosts, ...hardcodedPosts];
  const uniquePosts = allPosts.filter((post, index, self) => 
    index === self.findIndex(p => p.slug === post.slug)
  );
  
  return uniquePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

#### 智能渲染器选择
```typescript
// app/posts/[slug]/page.tsx
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return <div>Post not found</div>;

  // 检测内容类型
  const isMDXContent = post.content.includes('---') && !post.content.includes('<p>');
  
  return (
    <article className="prose prose-stone dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <div className="text-muted-foreground mb-8">
        {post.date} • {post.tags?.join(', ')}
      </div>
      
      {isMDXContent ? (
        <MDXRemote source={post.content} components={MDXComponents} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </article>
  );
}
```

### 2. 样式系统

#### 主题感知的 MDX 组件
```typescript
// app/components/MDXComponents.tsx
const MDXComponents = {
  h1: ({ children, ...props }: MDXComponentsProps) => (
    <h1 
      className="font-serif text-3xl sm:text-4xl mt-8 mb-6 leading-tight text-foreground" 
      {...props}
    >
      {children}
    </h1>
  ),
  
  p: ({ children, ...props }: MDXComponentsProps) => (
    <p 
      className="mb-4 text-foreground leading-relaxed" 
      {...props}
    >
      {children}
    </p>
  ),
  
  a: ({ children, href, ...props }: MDXComponentsProps & { href?: string }) => (
    <a 
      href={href}
      className="text-primary hover:text-primary/80 underline transition-colors" 
      {...props}
    >
      {children}
    </a>
  ),
  
  // ... 其他元素
};
```

#### 响应式设计系统
```typescript
// 容器系统
const containerStyles = "container mx-auto max-w-6xl px-4 sm:px-8";

// 网格布局
const gridStyles = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

// 字体大小
const textStyles = "text-lg sm:text-xl lg:text-2xl";

// 主题切换
const themeStyles = "bg-background text-foreground transition-colors duration-200";
```

## 📊 数据流

### 1. 文章数据流

```
content/posts/*.{mdx,md}
    ↓
getPostsFromFilesystem()
    ↓
合并硬编码文章数据
    ↓
去重 (文件系统优先)
    ↓
按日期排序
    ↓
传递给组件渲染
```

### 2. 主题数据流

```
用户操作 / 系统偏好
    ↓
next-themes 检测
    ↓
更新 CSS 变量
    ↓
组件重新渲染
    ↓
背景动画切换
```

### 3. 页面渲染流程

```
用户访问 /posts/[slug]
    ↓
generateStaticParams() 生成静态路径
    ↓
getPostBySlug() 获取文章数据
    ↓
检测内容类型 (MDX vs HTML)
    ↓
选择渲染器
    ↓
应用主题样式
    ↓
渲染页面内容
```

## 🔍 性能优化

### 1. 静态生成 (SSG)
- 所有页面在构建时预渲染
- 使用 `generateStaticParams` 生成静态路径
- 减少运行时计算

### 2. 主题优化
- 使用 `mounted` 状态避免水合不匹配
- CSS 变量实现平滑主题切换
- 背景动画按需加载

### 3. 图片优化
- 使用外部图片服务 (Picsum Photos)
- 自动压缩和格式优化
- 响应式图片加载

### 4. 代码分割
- 组件级别的代码分割
- 动态导入非关键组件
- 减少初始包大小

### 5. 缓存策略
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

#### 主题组件开发
```typescript
// 客户端组件需要 'use client'
'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeAwareComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免水合不匹配
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={`theme-aware ${theme === 'dark' ? 'dark-styles' : 'light-styles'}`}>
      Content
    </div>
  );
}
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

#### 主题测试
```typescript
// 测试主题切换
import { ThemeProvider } from 'next-themes';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      {component}
    </ThemeProvider>
  );
};
```

#### 集成测试
- 测试页面路由
- 测试数据获取
- 测试用户交互
- 测试主题切换

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
- 主题切换性能

### 错误追踪
- 客户端错误日志
- 服务器端错误日志
- 构建错误通知
- 水合错误监控

## 🔮 未来规划

### 短期目标
- [x] 深色模式支持
- [x] 主题切换功能
- [x] 背景动画系统
- [x] 加载体验优化
- [x] MDX 对比度修复
- [ ] 添加文章搜索功能
- [ ] 实现文章分类和标签系统
- [ ] 添加评论系统
- [ ] 优化图片加载性能

### 长期目标
- [ ] 实现多语言支持
- [ ] 添加用户认证系统
- [ ] 实现内容管理系统 (CMS)
- [ ] 添加分析仪表板
- [ ] 实现离线支持 (PWA)
- [ ] 添加更多动画效果

## 📚 参考资料

- [Next.js 官方文档](https://nextjs.org/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [next-themes 文档](https://github.com/pacocoursey/next-themes)
- [MDX 官方文档](https://mdxjs.com/)
- [React 官方文档](https://react.dev/)
- [HTML5 Canvas 教程](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

*本文档会随着项目发展持续更新。* 