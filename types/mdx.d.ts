declare module '*.mdx' {
  import type { ComponentProps, ComponentType, ReactElement } from 'react';
  
  const component: ComponentType<ComponentProps<'div'>>;
  export default component;
  
  export const frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    tags?: string[];
  };
} 