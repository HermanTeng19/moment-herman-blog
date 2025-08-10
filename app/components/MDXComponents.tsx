import React from 'react';
import GameRating from './GameRating';
import CombatDemo, { Skill } from './CombatDemo';
import CharacterCard from './CharacterCard';
import BattleReplay, { BattleScene } from './BattleReplay';
import TeamSpirit, { Member } from './TeamSpirit';
import GameStats, { Stat } from './GameStats';

interface MDXComponentsProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const MDXComponents = {
  h1: ({ children, ...props }: MDXComponentsProps) => (
    <h1 
      className="font-serif text-3xl sm:text-4xl mt-8 mb-6 leading-tight text-foreground" 
      {...props}
    >
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: MDXComponentsProps) => (
    <h2 
      className="font-serif text-2xl sm:text-3xl mt-8 mb-4 leading-tight text-foreground" 
      {...props}
    >
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: MDXComponentsProps) => (
    <h3 
      className="font-serif text-xl sm:text-2xl mt-6 mb-3 leading-tight text-foreground" 
      {...props}
    >
      {children}
    </h3>
  ),
  
  p: ({ children, ...props }: MDXComponentsProps) => (
    <p 
      className="mb-4 text-foreground leading-relaxed" 
      {...props}
    >
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: MDXComponentsProps) => (
    <ul 
      className="mb-4 pl-6 space-y-2 text-foreground" 
      {...props}
    >
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: MDXComponentsProps) => (
    <ol 
      className="mb-4 pl-6 space-y-2 text-foreground" 
      {...props}
    >
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }: MDXComponentsProps) => (
    <li 
      className="text-foreground" 
      {...props}
    >
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }: MDXComponentsProps) => (
    <blockquote 
      className="border-l-4 border-muted-foreground pl-4 my-6 italic text-muted-foreground" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  code: ({ children, ...props }: MDXComponentsProps) => (
    <code 
      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700" 
      {...props}
    >
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: MDXComponentsProps) => (
    <pre 
      className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 shadow-sm" 
      {...props}
    >
      {children}
    </pre>
  ),
  
  a: ({ children, href, ...props }: MDXComponentsProps & { href?: string }) => (
    <a 
      href={href}
      className="text-primary hover:text-primary/80 underline transition-colors" 
      {...props}
    >
      {children}
    </a>
  ),
  
  img: ({ src, alt, ...props }: MDXComponentsProps & { src?: string; alt?: string }) => (
    <img
      src={src}
      alt={alt || ''}
      className="my-6 w-full h-auto rounded-sm shadow-sm"
      {...props}
    />
  ),
  
  hr: ({ ...props }: MDXComponentsProps) => (
    <hr 
      className="border-muted-foreground my-8" 
      {...props}
    />
  ),
  
  strong: ({ children, ...props }: MDXComponentsProps) => (
    <strong 
      className="font-semibold text-foreground" 
      {...props}
    >
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }: MDXComponentsProps) => (
    <em 
      className="italic text-foreground" 
      {...props}
    >
      {children}
    </em>
  ),

  // 游戏相关组件
  GameRating,
  CombatDemo,
  Skill,
  CharacterCard,
  BattleReplay,
  BattleScene,
  TeamSpirit,
  Member,
  GameStats,
  Stat,
};

export default MDXComponents; 