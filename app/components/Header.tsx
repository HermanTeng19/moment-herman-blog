'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: '首页', external: false },
  { href: '/writings', label: '随笔', external: false },
  { href: 'https://music.hermanteng.net', label: '音乐', external: true },
  { href: '/gallery', label: '光影集', external: false },
  { href: '/about', label: '关于', external: false },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
        <Link 
          href="/" 
            className={`font-serif text-xl sm:text-2xl tracking-widest transition-colors duration-300 hover:text-primary ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
        >
          云舒亭
        </Link>
        
          <nav className="hidden md:flex items-center space-x-6 sm:space-x-10 text-sm tracking-wider">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nav-link transition-colors duration-300 ${
                    isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link transition-colors duration-300 ${
                    pathname === item.href
                      ? (isScrolled ? 'text-foreground' : 'text-white')
                      : (isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white')
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-background/80 backdrop-blur-md border border-border"
              aria-label="切换菜单"
          >
              <svg
                className="w-5 h-5 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
            </svg>
          </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-b border-border">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-sm transition-colors duration-300 text-muted-foreground hover:text-foreground hover:bg-accent`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-sm transition-colors duration-300 ${
                      pathname === item.href
                        ? 'text-foreground bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 