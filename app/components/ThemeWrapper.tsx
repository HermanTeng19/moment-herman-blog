'use client';

import { useEffect } from 'react';
import { useTheme } from '../lib/useTheme';
import BackgroundAnimation from './BackgroundAnimation';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return (
    <>
      <BackgroundAnimation theme={theme} />
      {children}
    </>
  );
} 