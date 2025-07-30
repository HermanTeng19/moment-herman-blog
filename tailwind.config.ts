import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
        },
        // 深色主题色彩
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // 新增：更精确的颜色系统
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        lg: 'var(--color-radius)',
        md: 'calc(var(--color-radius) - 2px)',
        sm: 'calc(var(--color-radius) - 4px)',
      },
      // CSS变量定义
      backgroundColor: {
        'theme-bg': 'var(--bg-primary)',
        'theme-bg-secondary': 'var(--bg-secondary)',
        'theme-bg-tertiary': 'var(--bg-tertiary)',
      },
      textColor: {
        'theme-text': 'var(--text-primary)',
        'theme-text-secondary': 'var(--text-secondary)',
        'theme-text-tertiary': 'var(--text-tertiary)',
      },
      borderColor: {
        'theme-border': 'var(--border-color)',
        'theme-border-secondary': 'var(--border-secondary)',
      },
      // 新增：Typography插件配置
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            strong: {
              color: theme('colors.stone.800'),
            },
            blockquote: {
              color: theme('colors.stone.700'),
              borderLeftColor: theme('colors.stone.300'),
            },
            code: {
              color: theme('colors.stone.800'),
              backgroundColor: theme('colors.stone.100'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            a: {
              color: theme('colors.stone.600'),
              '&:hover': {
                color: theme('colors.stone.800'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            strong: {
              color: theme('colors.stone.200'),
            },
            blockquote: {
              color: theme('colors.stone.400'),
              borderLeftColor: theme('colors.stone.600'),
            },
            code: {
              color: theme('colors.stone.200'),
              backgroundColor: theme('colors.dark.700'),
            },
            a: {
              color: theme('colors.stone.400'),
              '&:hover': {
                color: theme('colors.stone.200'),
              },
            },
            h1: {
              color: theme('colors.stone.200'),
            },
            h2: {
              color: theme('colors.stone.200'),
            },
            h3: {
              color: theme('colors.stone.200'),
            },
            h4: {
              color: theme('colors.stone.200'),
            },
            hr: {
              borderColor: theme('colors.stone.600'),
            },
            ol: {
              li: {
                '&::marker': {
                  color: theme('colors.stone.400'),
                },
              },
            },
            ul: {
              li: {
                '&::marker': {
                  color: theme('colors.stone.400'),
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 