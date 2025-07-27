# 隙间光 | Komorebi - Personal Blog

A minimalist personal blog website built with Next.js, featuring a wabi-sabi aesthetic that celebrates imperfection and finds beauty in the transient moments of life.

## 🌟 Features

- **Wabi-Sabi Design**: Embracing imperfection and finding beauty in simplicity
- **Chinese Typography**: Beautiful Noto Sans SC and Noto Serif SC fonts
- **Responsive Layout**: Mobile-first design that works on all devices
- **Blog Posts**: Dynamic blog post pages with rich content
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
│   └── PostCard.tsx    # Blog post preview card
├── lib/
│   └── posts.ts        # Blog post data and utilities
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
- **Google Fonts**: Noto Sans SC and Noto Serif SC

## 📝 Content

The blog features philosophical essays in Chinese that explore themes of:
- Impermanence and beauty in everyday moments
- Mindfulness and contemplation
- Finding meaning in simple things
- The passage of time and memory

## 🎨 Customization

### Colors
The color scheme uses warm stone tones:
- Background: `#fdfcfb` (warm off-white)
- Text: `#4a4a4a` (soft dark gray)
- Accents: `#a1887f` (muted earthy color)

### Typography
- **Noto Sans SC**: Body text and UI elements
- **Noto Serif SC**: Headings and titles

### Adding New Posts
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
