import Header from '../components/Header';
import Footer from '../components/Footer';
import OrigamiBackground from '../components/OrigamiBackground';
import FireflyBackground from '../components/FireflyBackground';
import { getAllPosts } from '../lib/posts';
import Link from 'next/link';

export default async function WritingsPage() {
  // 获取所有文章（已经包含了文件系统和硬编码文章）
  const posts = getAllPosts();

  return (
    <>
      <OrigamiBackground />
      {/* 萤火虫背景动画 - 仅在深色模式 */}
      <FireflyBackground />
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 relative z-10">
        <Header />
        
        <main>
          <section className="py-16 sm:py-24">
            <h1 className="font-serif text-4xl text-center mb-16 tracking-widest text-stone-800 dark:text-stone-200">
              所有随笔
            </h1>
            <div className="relative max-w-2xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 h-full w-px bg-stone-200 dark:bg-stone-600"></div>
              
              {posts.map((post, index) => (
                <div key={post.id} className="relative mb-12">
                  <div className="absolute left-4 sm:left-1/2 top-2 -ml-px w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500"></div>
                  <div className={`pl-10 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'}`}>
                    <p className="text-xs text-stone-400 dark:text-stone-500 tracking-widest">{post.date}</p>
                    <h3 className="font-serif text-xl mt-1 text-stone-800 dark:text-stone-200 hover:text-stone-500 dark:hover:text-stone-300 transition-colors duration-300">
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
    </>
  );
} 