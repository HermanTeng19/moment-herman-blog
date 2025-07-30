# 隙间光 | Komorebi - Personal Blog

A minimalist personal blog website built with Next.js, featuring a wabi-sabi aesthetic that celebrates imperfection and finds beauty in the transient moments of life.

## 🌟 Features

- **Wabi-Sabi Design**: Embracing imperfection and finding beauty in simplicity
- **Chinese Typography**: Beautiful Noto Sans SC and Noto Serif SC fonts
- **Responsive Layout**: Mobile-first design that works on all devices
- **Blog Posts**: Dynamic blog post pages with rich content
- **MDX & Markdown Support**: Write content in `.mdx` or `.md` format with full frontmatter support
- **Gallery**: Masonry-style photo gallery
- **Timeline**: Elegant timeline layout for blog posts
- **Smooth Animations**: Subtle hover effects and page transitions

## 🎨 Design Philosophy

This blog embodies the Japanese aesthetic of wabi-sabi (侘寂), which finds beauty in imperfection, impermanence, and incompleteness. The design features:

- Warm, muted color palette with stone tones
- Minimalist typography with careful spacing
- Subtle shadows and rounded corners
- Imperfect underlines on hover effects
- Contemplative imagery and thoughtful content

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
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── PostCard.tsx    # Blog post preview card
│   ├── MDXComponents.tsx # Custom MDX components
│   ├── MarkdownRenderer.tsx # Markdown rendering component
│   └── HomeClient.tsx  # Client-side home page logic
├── lib/
│   ├── posts.ts        # Hardcoded blog post data
│   └── mdx.ts          # MDX/Markdown file processing
├── content/
│   └── posts/          # MDX and Markdown files
├── writings/           # All blog posts page
├── gallery/            # Photo gallery page
├── about/              # About page
├── posts/[slug]/       # Individual blog post pages
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx            # Home page
└── globals.css         # Global styles and animations
```

## 🎯 Pages

- **Home** (`/`): Hero section with latest blog posts
- **Writings** (`/writings`): Timeline view of all blog posts
- **Gallery** (`/gallery`): Masonry-style photo gallery
- **About** (`/about`): Personal introduction
- **Blog Posts** (`/posts/[slug]`): Individual blog post pages

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **@tailwindcss/typography**: Rich text styling
- **MDX**: Markdown with JSX support
- **react-markdown**: Markdown rendering
- **gray-matter**: Frontmatter parsing
- **Google Fonts**: Noto Sans SC and Noto Serif SC

## 📝 Content Management

### Writing Blog Posts

The blog supports two content formats:

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

### Frontmatter

All content files support the following frontmatter fields:

- `title` (required): Post title
- `date` (required): Publication date
- `excerpt` (required): Post summary
- `image` (optional): Featured image URL
- `tags` (optional): Array of tags

### Supported Markdown Features

Both MDX and Markdown files support:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Text Formatting**: **bold**, *italic*, `code`
- **Lists**: Ordered and unordered lists
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Blockquotes**: `> quote`
- **Code Blocks**: ```javascript ... ```
- **Horizontal Rules**: `---`

### MDX Additional Features

MDX files also support:

- **React Components**: Import and use custom components
- **JSX**: Full React syntax within markdown
- **Dynamic Content**: Interactive elements

## 🎨 Customization

### Colors
The color scheme uses warm stone tones:
- Background: `#fdfcfb` (warm off-white)
- Text: `#4a4a4a` (soft dark gray)
- Accents: `#a1887f` (muted earthy color)

### Typography
- **Noto Sans SC**: Body text and UI elements
- **Noto Serif SC**: Headings and titles

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
}
```

## 🚀 Deployment

The site can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*"于无常之中，寻觅须臾之美。"*  
*"In impermanence, seeking moments of beauty."*
