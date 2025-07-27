import Link from 'next/link';
import { Post } from '../lib/posts';

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  return (
    <div className={`group ${className}`}>
      <Link href={`/posts/${post.slug}`}>
        {post.image && (
          <img 
            src={post.image} 
            alt="" 
            className="w-full h-auto object-cover rounded-sm mb-4 shadow-sm shadow-stone-200"
          />
        )}
        <p className="text-xs text-stone-400 tracking-widest">{post.date}</p>
        <h3 className="font-serif text-xl mt-2 mb-3 text-stone-800 group-hover:text-stone-500 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
      </Link>
    </div>
  );
} 