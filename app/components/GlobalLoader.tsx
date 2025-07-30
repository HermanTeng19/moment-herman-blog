'use client';

import { useState, useEffect } from 'react';

interface GlobalLoaderProps {
  children: React.ReactNode;
}

export default function GlobalLoader({ children }: GlobalLoaderProps) {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // 预加载Hero背景图片
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = 'https://picsum.photos/1920/1080';

    // 模拟内容准备完成（实际项目中可能需要等待其他资源）
    const contentTimer = setTimeout(() => {
      setContentReady(true);
    }, 500);

    return () => {
      img.onload = null;
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    // 当图片和内容都准备好时，开始显示页面
    if (imageLoaded && contentReady) {
      const timer = setTimeout(() => {
        setIsFullyLoaded(true);
      }, 300); // 给动画一个缓冲时间

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, contentReady]);

  return (
    <>
      {/* 全局加载层 */}
      {!isFullyLoaded && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            {/* SVG动画 */}
            <svg className="w-32 h-32 mx-auto mb-8" viewBox="0 0 120 100">
              <defs>
                <linearGradient id="shimmer-gradient">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
                <clipPath id="icons-clip">
                  <path d="M25 70 L45 40 L58 60 L75 30 L95 70 Z" />
                  <path d="M48 48 L62 58 L48 68 Z" />
                </clipPath>
              </defs>

              <g id="loader-container">
                <rect 
                  id="frame" 
                  x="1" y="1" width="118" height="98" rx="8"
                  stroke="#d9d9d9"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="520"
                  strokeDashoffset="520"
                  style={{
                    animation: 'draw-frame 1.5s ease-out forwards'
                  }}
                />
                
                <g 
                  id="placeholder-icons"
                  style={{
                    opacity: 0,
                    animation: 'fade-in-icons 1s ease 1s forwards'
                  }}
                >
                  <path d="M25 70 L45 40 L58 60 L75 30 L95 70 Z" fill="#e0e0e0" />
                  <circle cx="78" cy="25" r="4" fill="#e0e0e0" />
                  <path d="M48 48 L62 58 L48 68 Z" fill="#e0e0e0" />
                </g>

                <rect 
                  id="shimmer" 
                  x="0" y="0" width="100" height="100"
                  fill="url(#shimmer-gradient)"
                  clipPath="url(#icons-clip)"
                  style={{
                    animation: 'shimmer-move 2s ease-in-out infinite 2s'
                  }}
                />
                
                <g transform="translate(10, 85)">
                  <rect 
                    id="progress-bar-track" 
                    width="100" height="4" rx="2"
                    fill="#e9e9e9"
                  />
                  <svg width="100" height="4" x="0" y="0">
                    <rect 
                      id="progress-bar-fill" 
                      width="100" height="4" rx="2"
                      fill="#b0b0b0"
                      style={{
                        animation: 'progress-move 2s ease-in-out infinite 2s'
                      }}
                    />
                  </svg>
                </g>
              </g>
            </svg>
            
            <div className="text-white/80 text-lg font-light tracking-wider">
              <span className="inline-block animate-fade-in">正在加载</span>
              <span className="inline-block animate-bounce delay-100">.</span>
              <span className="inline-block animate-bounce delay-200">.</span>
              <span className="inline-block animate-bounce delay-300">.</span>
            </div>
          </div>
        </div>
      )}

      {/* 页面内容 */}
      <div className={`transition-opacity duration-1000 ${
        isFullyLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {children}
      </div>
    </>
  );
} 