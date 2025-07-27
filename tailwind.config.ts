import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-sc': ['var(--font-noto-sans-sc)', 'sans-serif'],
        'noto-serif-sc': ['var(--font-noto-serif-sc)', 'serif'],
      },
      colors: {
        stone: {
          200: '#e7e5e4',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 