import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPostBySlug, getAllPosts } from '../../lib/posts';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 