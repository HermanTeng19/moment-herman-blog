import { Post } from './posts';

export interface MarkdownPost extends Post {
  content: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    tags?: string[];
  };
}

// 解析中文日期格式的函数
function parseChineseDate(dateStr: string): Date {
  // 处理 "2024年12月11日" 和 "2024年12.18日" 格式
  const match = dateStr.match(/(\d{4})年(\d{1,2})[月\.](\d{1,2})日/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  
  // 如果无法解析，返回一个很早的日期
  console.warn(`无法解析日期格式: ${dateStr}`);
  return new Date(1900, 0, 1);
}

// 服务器端函数 - 支持 .md 和 .mdx 文件
export async function getMarkdownPostBySlug(slug: string): Promise<MarkdownPost | null> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const matter = await import('gray-matter');
    
    const postsDirectory = process.cwd() + '/content/posts';
    
    // 尝试 .mdx 文件
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      // 如果 .mdx 不存在，尝试 .md 文件
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter.default(fileContents);

    return {
      id: slug,
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image,
      content,
      frontmatter: {
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        image: data.image,
        tags: data.tags || [],
      },
    };
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllMarkdownPosts(): Promise<MarkdownPost[]> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const matter = await import('gray-matter');
    
    const postsDirectory = process.cwd() + '/content/posts';
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName: string) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter.default(fileContents);

        return {
          id: slug,
          slug,
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          image: data.image,
          content,
          frontmatter: {
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            image: data.image,
            tags: data.tags || [],
          },
        };
      })
      .sort((a: MarkdownPost, b: MarkdownPost) => {
        const dateA = parseChineseDate(a.date);
        const dateB = parseChineseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });

    return allPostsData;
  } catch (error) {
    console.error('Error reading markdown posts directory:', error);
    return [];
  }
}

export async function getMarkdownPostSlugs(): Promise<string[]> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const postsDirectory = process.cwd() + '/content/posts';
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName: string) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName: string) => fileName.replace(/\.(mdx|md)$/, ''));
  } catch (error) {
    console.error('Error reading markdown post slugs:', error);
    return [];
  }
}

// 向后兼容的别名
export const getMDXPostBySlug = getMarkdownPostBySlug;
export const getAllMDXPosts = getAllMarkdownPosts;
export const getMDXPostSlugs = getMarkdownPostSlugs;
export type MDXPost = MarkdownPost; 