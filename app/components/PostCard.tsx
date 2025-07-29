import Link from 'next/link';
import { Post } from '../lib/posts';

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  return (
    <div className={`post-wrap group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      <Link href={`/posts/${post.slug}`} className="block">
        {post.image && (
          <div className="post-image relative w-full h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt="" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          </div>
        )}
        
        <div className="post-content p-6">
          <div className="post-content-wrap">
            <h3 className="post-title font-serif text-xl mb-3 text-stone-800 group-hover:text-stone-500 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
            <div className="post-excerpt">
              <p className="text-sm leading-relaxed text-stone-600 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </div>
          
          <div className="post-info mt-4 pt-4 border-t border-stone-100">
            <span className="text-xs text-stone-400 tracking-wider">
              {post.date}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 