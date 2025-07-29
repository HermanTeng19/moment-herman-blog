'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: '首页', id: 'nav-home' },
    { href: '/writings', label: '随笔', id: 'nav-writings' },
    { href: '/gallery', label: '光影集', id: 'nav-gallery' },
    { href: '/about', label: '关于', id: 'nav-about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Site Title */}
          <Link 
            href="/" 
            className={`font-serif text-xl sm:text-2xl tracking-widest transition-colors duration-300 hover:text-stone-500 ${
              isScrolled ? 'text-stone-800' : 'text-white'
            }`}
          >
            云舒亭
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 sm:space-x-10 text-sm tracking-wider">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link transition-colors duration-300 ${
                  pathname === item.href 
                    ? (isScrolled ? 'text-stone-800' : 'text-white') 
                    : (isScrolled ? 'text-stone-600 hover:text-stone-800' : 'text-white/80 hover:text-white')
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-stone-800' : 'text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm transition-colors duration-300 ${
                    pathname === item.href 
                      ? 'text-stone-800 bg-stone-100' 
                      : 'text-stone-600 hover:text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 