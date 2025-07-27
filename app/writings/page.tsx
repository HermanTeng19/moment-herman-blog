import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllPosts } from '../lib/posts';
import Link from 'next/link';

export default function WritingsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-8">
      <Header />
      
      <main>
        <section className="py-16 sm:py-24">
          <h1 className="font-serif text-4xl text-center mb-16 tracking-widest text-stone-800">
            所有随笔
          </h1>
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-px bg-stone-200"></div>
            
            {posts.map((post, index) => (
              <div key={post.id} className="relative mb-12">
                <div className="absolute left-4 sm:left-1/2 top-2 -ml-px w-2 h-2 rounded-full bg-stone-400"></div>
                <div className={`pl-10 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'}`}>
                  <p className="text-xs text-stone-400 tracking-widest">{post.date}</p>
                  <h3 className="font-serif text-xl mt-1 text-stone-800 hover:text-stone-500 transition-colors duration-300">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 