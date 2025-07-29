import { Post } from './posts';

export interface MDXPost extends Post {
  content: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    tags?: string[];
  };
}

// 服务器端函数
export async function getMDXPostBySlug(slug: string): Promise<MDXPost | null> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const matter = await import('gray-matter');
    
    const postsDirectory = process.cwd() + '/content/posts';
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
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
    console.error(`Error reading MDX file for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllMDXPosts(): Promise<MDXPost[]> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const matter = await import('gray-matter');
    
    const postsDirectory = process.cwd() + '/content/posts';
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName: string) => fileName.endsWith('.mdx'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.mdx$/, '');
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
      .sort((a: MDXPost, b: MDXPost) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allPostsData;
  } catch (error) {
    console.error('Error reading MDX posts directory:', error);
    return [];
  }
}

export async function getMDXPostSlugs(): Promise<string[]> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const postsDirectory = process.cwd() + '/content/posts';
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName: string) => fileName.endsWith('.mdx'))
      .map((fileName: string) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading MDX post slugs:', error);
    return [];
  }
} 