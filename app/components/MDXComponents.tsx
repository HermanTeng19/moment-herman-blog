import React from 'react';

interface MDXComponentsProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const MDXComponents = {
  h1: ({ children, ...props }: MDXComponentsProps) => (
    <h1 
      className="font-serif text-3xl sm:text-4xl mt-8 mb-6 leading-tight text-stone-800" 
      {...props}
    >
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: MDXComponentsProps) => (
    <h2 
      className="font-serif text-2xl sm:text-3xl mt-8 mb-4 leading-tight text-stone-800" 
      {...props}
    >
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: MDXComponentsProps) => (
    <h3 
      className="font-serif text-xl sm:text-2xl mt-6 mb-3 leading-tight text-stone-800" 
      {...props}
    >
      {children}
    </h3>
  ),
  
  p: ({ children, ...props }: MDXComponentsProps) => (
    <p 
      className="mb-4 text-stone-700 leading-relaxed" 
      {...props}
    >
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: MDXComponentsProps) => (
    <ul 
      className="mb-4 pl-6 space-y-2 text-stone-700" 
      {...props}
    >
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: MDXComponentsProps) => (
    <ol 
      className="mb-4 pl-6 space-y-2 text-stone-700" 
      {...props}
    >
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }: MDXComponentsProps) => (
    <li 
      className="text-stone-700" 
      {...props}
    >
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }: MDXComponentsProps) => (
    <blockquote 
      className="border-l-4 border-stone-300 pl-4 my-6 italic text-stone-600" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  code: ({ children, ...props }: MDXComponentsProps) => (
    <code 
      className="bg-stone-100 px-2 py-1 rounded text-sm font-mono text-stone-800" 
      {...props}
    >
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: MDXComponentsProps) => (
    <pre 
      className="bg-stone-100 p-4 rounded-lg overflow-x-auto my-6" 
      {...props}
    >
      {children}
    </pre>
  ),
  
  a: ({ children, href, ...props }: MDXComponentsProps & { href?: string }) => (
    <a 
      href={href}
      className="text-stone-600 hover:text-stone-800 underline transition-colors" 
      {...props}
    >
      {children}
    </a>
  ),
  
  img: ({ src, alt, ...props }: MDXComponentsProps & { src?: string; alt?: string }) => (
    <div className="my-6">
      <img 
        src={src}
        alt={alt || ''}
        className="w-full h-auto rounded-sm shadow-sm shadow-stone-200" 
        {...props}
      />
    </div>
  ),
  
  hr: ({ ...props }: MDXComponentsProps) => (
    <hr 
      className="border-stone-300 my-8" 
      {...props}
    />
  ),
  
  strong: ({ children, ...props }: MDXComponentsProps) => (
    <strong 
      className="font-semibold text-stone-800" 
      {...props}
    >
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }: MDXComponentsProps) => (
    <em 
      className="italic text-stone-700" 
      {...props}
    >
      {children}
    </em>
  ),
};

export default MDXComponents; 