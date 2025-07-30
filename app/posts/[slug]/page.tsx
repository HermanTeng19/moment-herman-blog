import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MDXComponents from '../../components/MDXComponents';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { getMarkdownPostBySlug, getAllMarkdownPosts } from '../../lib/mdx';
import fs from 'fs';
import path from 'path';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // 获取所有文章（包括硬编码的和Markdown的）
  const hardcodedPosts = getAllPosts();
  const markdownPosts = await getAllMarkdownPosts();
  
  const allSlugs = [
    ...hardcodedPosts.map(post => ({ slug: post.slug })),
    ...markdownPosts.map(post => ({ slug: post.slug }))
  ];
  
  return allSlugs;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  // 首先尝试获取Markdown文章
  const markdownPost = await getMarkdownPostBySlug(slug);
  
  // 如果没有找到Markdown文章，尝试获取硬编码文章
  const hardcodedPost = getPostBySlug(slug);
  
  const post = markdownPost || hardcodedPost;

  if (!post) {
    notFound();
  }

  // 检查文件扩展名以决定渲染方式
  const postsDirectory = process.cwd() + '/content/posts';
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  
  const isMDX = markdownPost && fs.existsSync(mdxPath);
  const isMarkdown = markdownPost && !isMDX && fs.existsSync(mdPath);

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-8">
      <Header />
      
      <main>
        <section className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-stone-400 tracking-widest">{post.date}</p>
            <h1 className="font-serif text-3xl sm:text-4xl mt-4 leading-tight text-stone-800">
              {post.title}
            </h1>
            {post.image && (
              <img 
                src={post.image} 
                alt="" 
                className="w-full h-auto object-cover rounded-sm my-8 sm:my-12 shadow-sm shadow-stone-200"
              />
            )}
            <div className="prose prose-stone max-w-none lg:prose-lg text-stone-700 leading-relaxed">
              {isMDX ? (
                // 渲染MDX内容
                <MDXRemote 
                  source={post.content} 
                  components={MDXComponents}
                />
              ) : isMarkdown ? (
                // 渲染Markdown内容
                <MarkdownRenderer content={post.content} />
              ) : (
                // 渲染硬编码内容
                post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 