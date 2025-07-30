'use client';

import { useState, useEffect } from 'react';
import Footer from './Footer';
import PostCard from './PostCard';
import FireflyBackground from './FireflyBackground';
import { Post } from '../lib/posts';

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) {
      // Animation finished
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.substring(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed]);

  const isFinished = currentIndex >= text.length;

  return { displayText, isFinished };
};

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [heroTitle, setHeroTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 3x3 grid

  const textToAnimate = heroTitle.endsWith('。') ? heroTitle.slice(0, -1) : heroTitle;
  const showBlinkingCursor = heroTitle.endsWith('。');

  const { displayText: animatedTitle, isFinished } = useTypewriter(textToAnimate, 100);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://v2.jinrishici.com/one.json');
        const data = await response.json();
        if (data && data.data && data.data.content) {
          setHeroTitle(data.data.content);
        }
      } catch (error) {
        console.error('Failed to fetch quote from 一言API:', error);
        // Keep the default title if API fetch fails
      }
    };

    fetchQuote();
  }, []);

  const scrollToContainer = () => {
    const container = document.getElementById('container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 萤火虫背景动画 - 仅在深色模式 */}
      <FireflyBackground />
      
      {/* Hero Section - Full Screen */}
      <div className="preview relative h-screen">
        <div 
          className="preview-image absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Wave Overlay */}
          <div className="preview-overlay absolute bottom-0 left-0 right-0 z-10">
            <svg
              className="preview-waves relative block w-[calc(100%+1.3px)] h-[15vh] min-h-[100px] max-h-[150px]"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="preview-parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="preview-motto-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-6xl px-4 sm:px-8">
          <style jsx>{`
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
            }
            .preview-cursor {
              animation: blink 0.7s infinite;
            }
            @keyframes move-forever {
              0% {
                transform: translate3d(-90px, 0, 0);
              }
              100% {
                transform: translate3d(85px, 0, 0);
              }
            }
            .preview-parallax > use {
              animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
            }
            .preview-parallax > use:nth-child(1) {
              animation-delay: -2s;
              animation-duration: 7s;
            }
            .preview-parallax > use:nth-child(2) {
              animation-delay: -3s;
              animation-duration: 10s;
            }
            .preview-parallax > use:nth-child(3) {
              animation-delay: -4s;
              animation-duration: 13s;
            }
            .preview-parallax > use:nth-child(4) {
              animation-delay: -5s;
              animation-duration: 20s;
            }
            @media (max-width: 768px) {
              .preview-waves {
                height: 40px;
                min-height: 40px;
              }
            }
          `}</style>
          <h2 className="preview-motto text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 whitespace-nowrap overflow-hidden">
            {animatedTitle}
            {isFinished && showBlinkingCursor && (
              <span className="preview-cursor ml-2">_</span>
            )}
          </h2>
          <p className="text-lg text-stone-200 max-w-2xl mx-auto px-4">
            光影、尘埃、裂纹、静默。这里记录着那些不完美却充满诗意的瞬间，以及对生活本质的朴素思考。
          </p>
        </div>

        {/* Scroll Indicator - Above Wave Animation */}
        <div className="preview-scroll absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 z-20">
          <button 
            onClick={scrollToContainer}
            className="text-white hover:text-stone-300 transition-colors duration-300 p-3"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {/* Mouse body */}
              <path d="M12 2C8.5 2 6 4.5 6 8v8c0 3.5 2.5 6 6 6s6-2.5 6-6V8c0-3.5-2.5-6-6-6z"/>
              {/* Scroll wheel */}
              <ellipse cx="12" cy="8" rx="1" ry="0.5"/>
              {/* Center line */}
              <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Posts Container */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 relative z-10" id="container">
        {/* Posts Grid */}
        <section className="row py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {currentPosts.map((post, index) => (
              <div key={post.slug} className="post-item h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="paginator text-center mb-16">
            <div className="flex justify-center items-center space-x-2">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  &lt;
                </button>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded transition-colors ${
                    currentPage === page
                      ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  &gt;
                </button>
              )}
            </div>
          </section>
        )}
        
        <Footer />
      </div>
    </main>
  );
} 