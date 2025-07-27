import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <OrigamiBackground />
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 relative z-10">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-stone-800">
                于无常之中，<br />寻觅须臾之美。
              </h1>
              <p className="mt-6 text-base max-w-prose leading-relaxed text-stone-600">
                光影、尘埃、裂纹、静默。这里记录着那些不完美却充满诗意的瞬间，以及对生活本质的朴素思考。
              </p>
            </div>
            <div className="md:col-span-2 flex justify-center md:justify-end">
              <img 
                src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="" 
                className="object-cover w-full max-w-sm md:max-w-full h-auto rounded-sm shadow-md shadow-stone-200" 
                style={{ filter: 'saturate(0.8) contrast(0.9)' }}
              />
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="py-16 border-t border-stone-200">
          <h2 className="font-serif text-2xl text-center mb-12 text-stone-700 tracking-widest">
            最新随笔
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PostCard post={latestPosts[0]} />
            <PostCard post={latestPosts[1]} className="md:mt-16" />
            <PostCard post={latestPosts[2]} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
}
