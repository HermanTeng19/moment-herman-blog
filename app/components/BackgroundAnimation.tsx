'use client';

import { useEffect, useState } from 'react';
import LightAnimation from './LightAnimation';
import DarkAnimation from './DarkAnimation';

type Theme = 'light' | 'dark' | 'system';

interface BackgroundAnimationProps {
  theme: Theme;
}

export default function BackgroundAnimation({ theme }: BackgroundAnimationProps) {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return (
    <>
      {resolvedTheme === 'light' && <LightAnimation />}
      {resolvedTheme === 'dark' && <DarkAnimation />}
    </>
  );
} 