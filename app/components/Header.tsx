'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '首页', id: 'nav-home' },
    { href: '/writings', label: '随笔', id: 'nav-writings' },
    { href: '/gallery', label: '光影集', id: 'nav-gallery' },
    { href: '/about', label: '关于', id: 'nav-about' },
  ];

  return (
    <header className="py-8 sm:py-12">
      <div className="flex justify-between items-center">
        {/* Site Title */}
        <Link 
          href="/" 
          className="font-serif text-2xl tracking-widest text-stone-800 transition-colors duration-300 hover:text-stone-500"
        >
          隙间光
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-6 sm:space-x-10 text-sm tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link transition-colors duration-300 ${
                pathname === item.href ? 'active-link text-stone-800' : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
} 