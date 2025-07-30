'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children, ...props }) => (
          <h1
            className="font-serif text-3xl sm:text-4xl mt-8 mb-6 leading-tight text-stone-800 dark:text-stone-200"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="font-serif text-2xl sm:text-3xl mt-8 mb-4 leading-tight text-stone-800 dark:text-stone-200"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="font-serif text-xl sm:text-2xl mt-6 mb-3 leading-tight text-stone-800 dark:text-stone-200"
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p
            className="mb-4 text-stone-700 dark:text-stone-300 leading-relaxed"
            {...props}
          >
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul
            className="mb-4 pl-6 space-y-2 text-stone-700 dark:text-stone-300"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="mb-4 pl-6 space-y-2 text-stone-700 dark:text-stone-300"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li
            className="text-stone-700 dark:text-stone-300"
            {...props}
          >
            {children}
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-stone-300 dark:border-stone-600 pl-4 my-6 italic text-stone-600 dark:text-stone-400"
            {...props}
          >
            {children}
          </blockquote>
        ),
        code: ({ children, ...props }) => (
          <code
            className="bg-stone-100 dark:bg-dark-700 px-2 py-1 rounded text-sm font-mono text-stone-800 dark:text-stone-200"
            {...props}
          >
            {children}
          </code>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="bg-stone-100 dark:bg-dark-700 p-4 rounded-lg overflow-x-auto my-6"
            {...props}
          >
            {children}
          </pre>
        ),
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 underline transition-colors"
            {...props}
          >
            {children}
          </a>
        ),
        img: ({ src, alt, ...props }) => (
          <div className="my-6">
            <img
              src={src}
              alt={alt || ''}
              className="w-full h-auto rounded-sm shadow-sm shadow-stone-200 dark:shadow-dark-800"
              {...props}
            />
          </div>
        ),
        hr: ({ ...props }) => (
          <hr
            className="border-stone-300 dark:border-stone-600 my-8"
            {...props}
          />
        ),
        strong: ({ children, ...props }) => (
          <strong
            className="font-semibold text-stone-800 dark:text-stone-200"
            {...props}
          >
            {children}
          </strong>
        ),
        em: ({ children, ...props }) => (
          <em
            className="italic text-stone-700 dark:text-stone-300"
            {...props}
          >
            {children}
          </em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 