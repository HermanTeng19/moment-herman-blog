import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/app/lib/posts';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import MDXComponents from '@/app/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="page">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-8">
            <article className="prose prose-stone dark:prose-invert max-w-none lg:prose-lg">
              <div className="mb-8">
                <p className="text-sm text-muted-foreground tracking-widest">{post.date}</p>
                <h1 className="font-serif text-3xl sm:text-4xl mt-4 leading-tight text-foreground">
              {post.title}
            </h1>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
            {post.image && (
              <img 
                src={post.image} 
                alt="" 
                  className="w-full h-auto object-cover rounded-sm my-8 sm:my-12 shadow-sm"
              />
            )}
              
              {/* Excerpt as the first paragraph of content */}
              {post.excerpt && (
                <p className="mb-6 text-stone-700 dark:text-stone-300 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-8">
                {/^\s*<p[\s>]/.test(post.content.trim()) ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <MDXRemote source={post.content} components={MDXComponents} />
                )}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 