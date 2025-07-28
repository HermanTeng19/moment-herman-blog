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
      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl px-4 sm:px-8">
          <Header />
        </div>
      </div>
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 px-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-white drop-shadow-md">
              于无常之中，<br />寻觅须臾之美。
            </h1>
            <p className="mt-6 text-base max-w-prose leading-relaxed text-stone-200 drop-shadow-md">
              光影、尘埃、裂纹、静默。这里记录着那些不完美却充满诗意的瞬间，以及对生活本质的朴素思考。
            </p>
          </div>
        </section>

        {/* Latest Posts Section */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-8 relative z-10">
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
          <Footer />
        </div>
      </main>
    </>
  );
}
