# 隙间光 | Komorebi - Personal Blog

A minimalist personal blog website built with Next.js, featuring a wabi-sabi aesthetic that celebrates imperfection and finds beauty in the transient moments of life.

## 🌟 Features

- **🌙 Dark Mode Support**: Seamless light/dark theme switching with system preference detection
- **🎨 Wabi-Sabi Design**: Embracing imperfection and finding beauty in simplicity
- **📝 Chinese Typography**: Beautiful Noto Sans SC and Noto Serif SC fonts
- **📱 Responsive Layout**: Mobile-first design that works on all devices
- **📄 Blog Posts**: Dynamic blog post pages with rich content
- **📚 MDX & Markdown Support**: Write content in `.mdx` or `.md` format with full frontmatter support
- **🖼️ Gallery**: Masonry-style photo gallery
- **📅 Timeline**: Elegant timeline layout for blog posts
- **✨ Smooth Animations**: Subtle hover effects and page transitions
- **🎭 Dynamic Backgrounds**: Theme-specific canvas animations (Origami birds for light mode, Fireflies for dark mode)
- **⏳ Loading Experience**: Full-screen loading animation with SVG effects
- **🏷️ Tag System**: Organize posts with tags for better categorization
- **🎯 Enhanced Contrast**: Optimized text contrast for both light and dark themes

## 🎨 Design Philosophy

This blog embodies the Japanese aesthetic of wabi-sabi (侘寂), which finds beauty in imperfection, impermanence, and incompleteness. The design features:

- **Dual Theme System**: Warm light mode and contemplative dark mode
- **Dynamic Color Palette**: CSS variables for seamless theme switching
- **Minimalist Typography**: Careful spacing and hierarchy
- **Subtle Animations**: Canvas-based background effects and smooth transitions
- **Imperfect Elements**: Hand-drawn style underlines and organic shapes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moment-herman-blog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with theme toggle
│   ├── Footer.tsx      # Site footer
│   ├── PostCard.tsx    # Blog post preview card
│   ├── MDXComponents.tsx # Custom MDX components with theme-aware styling
│   ├── MarkdownRenderer.tsx # Markdown rendering component
│   ├── HomeClient.tsx  # Client-side home page logic
│   ├── ThemeToggle.tsx # Dark/light mode toggle button
│   ├── ThemeProvider.tsx # Next-themes provider wrapper
│   ├── GlobalLoader.tsx # Full-screen loading animation
│   ├── OrigamiBackground.tsx # Light mode canvas animation
│   └── FireflyBackground.tsx # Dark mode canvas animation
├── lib/
│   ├── posts.ts        # Blog post data management (filesystem + hardcoded)
│   └── mdx.ts          # MDX/Markdown file processing
├── content/
│   └── posts/          # MDX and Markdown files
├── writings/           # All blog posts page
├── gallery/            # Photo gallery page
├── about/              # About page
├── posts/[slug]/       # Individual blog post pages
├── layout.tsx          # Root layout with theme provider and global loader
├── page.tsx            # Home page
└── globals.css         # Global styles, animations, and CSS variables
```

## 🎯 Pages

- **Home** (`/`): Hero section with latest blog posts and dynamic backgrounds
- **Writings** (`/writings`): Timeline view of all blog posts with enhanced hover effects
- **Music** ("音乐"): External link to [music.hermanteng.net](https://music.hermanteng.net) (opens in a new tab)
- **Gallery** (`/gallery`): Masonry-style photo gallery
- **About** (`/about`): Personal introduction
- **Blog Posts** (`/posts/[slug]`): Individual blog post pages with optimized typography

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with dark mode support
- **@tailwindcss/typography**: Rich text styling for markdown content
- **next-themes**: Robust theme management with system preference detection
- **MDX**: Markdown with JSX support
- **react-markdown**: Markdown rendering
- **gray-matter**: Frontmatter parsing
- **Google Fonts**: Noto Sans SC and Noto Serif SC
- **HTML5 Canvas**: Dynamic background animations

## 🌙 Theme System

### Light Mode
- **Background**: Clean white with subtle warmth
- **Text**: Deep charcoal for excellent readability
- **Accents**: Muted earth tones
- **Animation**: Origami birds floating across the canvas

### Dark Mode
- **Background**: Deep slate with purple undertones
- **Text**: Soft white with careful contrast
- **Accents**: Warm highlights
- **Animation**: Interactive fireflies responding to mouse movement

### Theme Switching
- **Automatic**: Detects system preference on first visit
- **Manual**: Click the theme toggle in the header
- **Persistent**: Remembers user preference
- **Smooth**: No flash of unstyled content (FOUC)

## 📝 Content Management

### Writing Blog Posts

The blog supports two content formats with unified styling:

#### 1. MDX Files (`.mdx`)
MDX allows you to use React components within Markdown:

```mdx
---
title: "My MDX Post"
date: "2025年1月21日"
excerpt: "This is an excerpt"
image: "https://example.com/image.jpg"
tags: ["tag1", "tag2"]
---

# My MDX Post

This is a paragraph with **bold** and *italic* text.

<MyCustomComponent />

## Code Example

```javascript
function hello() {
  console.log('Hello, MDX!');
}
```
```

#### 2. Markdown Files (`.md`)
Standard Markdown format:

```markdown
---
title: "My Markdown Post"
date: "2025年1月21日"
excerpt: "This is an excerpt"
image: "https://example.com/image.jpg"
tags: ["tag1", "tag2"]
---

# My Markdown Post

This is a paragraph with **bold** and *italic* text.

## Code Example

```javascript
function hello() {
  console.log('Hello, Markdown!');
}
```
```

### File Organization

- Place all content files in `content/posts/`
- Use descriptive filenames (e.g., `my-awesome-post.mdx`)
- The slug will be automatically generated from the filename
- Both `.mdx` and `.md` files are supported in the same directory
- Filesystem posts take priority over hardcoded posts

### Frontmatter

All content files support the following frontmatter fields:

- `title` (required): Post title
- `date` (required): Publication date
- `excerpt` (required): Post summary
- `image` (optional): Featured image URL
- `tags` (optional): Array of tags for categorization

### Supported Markdown Features

Both MDX and Markdown files support:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Text Formatting**: **bold**, *italic*, `code`
- **Lists**: Ordered and unordered lists
- **Links**: `[text](url)` with hover effects
- **Images**: `![alt](url)` with responsive sizing
- **Blockquotes**: `> quote` with styled borders
- **Code Blocks**: ```javascript ... ``` with syntax highlighting
- **Horizontal Rules**: `---`

### MDX Additional Features

MDX files also support:

- **React Components**: Import and use custom components
- **JSX**: Full React syntax within markdown
- **Dynamic Content**: Interactive elements

## 🎨 Customization

### Color System
The color scheme uses CSS variables for theme consistency:

#### Light Mode Colors
```css
--color-background: #ffffff
--color-foreground: #1a1a1a
--color-card: #f8f9fa
--color-primary: #a1887f
--color-muted: #6c757d
```

#### Dark Mode Colors
```css
--color-background: #0f172a
--color-foreground: #f1f5f9
--color-card: #1e293b
--color-primary: #a1887f
--color-muted: #94a3b8
```

### Typography
- **Noto Sans SC**: Body text and UI elements
- **Noto Serif SC**: Headings and titles
- **Optimized Contrast**: Enhanced readability in both themes

### Adding Content

#### Method 1: MDX/Markdown Files (Recommended)
1. Create a new `.mdx` or `.md` file in `content/posts/`
2. Add frontmatter with required fields
3. Write your content using Markdown syntax
4. The post will automatically appear on the site

#### Method 2: Hardcoded Posts
Edit `app/lib/posts.ts` to add new blog posts with the following structure:
```typescript
{
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  slug: string;
  tags?: string[];
}
```

## ✨ Animation Features

### Background Animations
- **Origami Birds** (Light Mode): Graceful paper birds floating across the canvas
- **Fireflies** (Dark Mode): Interactive fireflies that respond to mouse movement
- **Performance Optimized**: Limited particle count for smooth performance

### Loading Experience
- **Full-Screen Loader**: SVG-based loading animation with gradient background
- **Asset Preloading**: Preloads critical images before revealing content
- **Smooth Transitions**: Fade-in effects for seamless user experience

### Hover Effects
- **Article Titles**: Subtle lift and underline effects
- **Post Cards**: Enhanced shadows and transitions
- **Theme Toggle**: Smooth icon transitions

## 🚀 Deployment

The site can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

```bash
npm run build
npm start
```

## 🔧 Recent Updates

### Latest Improvements
- **✅ Header Navigation**: Added external "音乐" link to open [music.hermanteng.net](https://music.hermanteng.net) in a new tab
- **✅ Dark Mode Implementation**: Complete theme system with next-themes
- **✅ MDX Contrast Fix**: Enhanced text readability in light mode
- **✅ Background Animations**: Theme-specific canvas effects
- **✅ Loading Experience**: Full-screen loading animation
- **✅ Tag System**: Post categorization and organization
- **✅ Unified Styling**: Consistent color system across all components
- **✅ Performance Optimization**: Hydration-safe theme switching
- **✅ Enhanced Typography**: Better contrast and readability

### Bug Fixes
- **✅ Hydration Issues**: Resolved theme switching mismatches
- **✅ Duplicate Content**: Fixed filesystem and hardcoded post merging
- **✅ Z-index Conflicts**: Proper layering of background animations
- **✅ Text Contrast**: Improved readability in both themes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*"于无常之中，寻觅须臾之美。"*  
*"In impermanence, seeking moments of beauty."*
