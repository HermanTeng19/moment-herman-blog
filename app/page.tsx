'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';

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

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);
  const [heroTitle, setHeroTitle] = useState('');

  const textToAnimate = heroTitle.endsWith('。') ? heroTitle.slice(0, -1) : heroTitle;
  const showBlinkingCursor = heroTitle.endsWith('。');

  const { displayText: animatedTitle, isFinished } = useTypewriter(textToAnimate, 100);

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
            <style jsx>{`
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
              }
              .fast-blink {
                animation: blink 0.5s infinite;
              }
              @keyframes wave {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
              .preview-parallax {
                animation: wave 10s ease-in-out infinite;
              }
              .preview-parallax:nth-child(2) {
                animation-duration: 12s;
                animation-delay: -2s;
              }
              .preview-parallax:nth-child(3) {
                animation-duration: 8s;
                animation-delay: -4s;
              }
            `}</style>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-white drop-shadow-md relative">
              {animatedTitle}
              {isFinished && showBlinkingCursor && (
                <span className="ml-2 inline-block h-0.5 w-8 fast-blink bg-white align-bottom"></span>
              )
              }
            </h1>
            <p className="mt-6 text-base max-w-prose leading-relaxed text-stone-200 drop-shadow-md text-center mx-auto">
              光影、尘埃、裂纹、静默。这里记录着那些不完美却充满诗意的瞬间，以及对生活本质的朴素思考。
            </p>
          </div>
          
          {/* Animated Wave SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              className="relative block w-[calc(100%+1.3px)] h-[60px]"
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
              </g>
              <g className="preview-parallax">
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              </g>
              <g className="preview-parallax">
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              </g>
              <g className="preview-parallax">
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
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
