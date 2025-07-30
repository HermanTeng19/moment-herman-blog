import Link from 'next/link';
import { Post } from '@/app/lib/posts';

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  return (
    <div className={`post-wrap group bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}>
      <Link href={`/posts/${post.slug}`} className="block h-full flex flex-col">
        {post.image && (
          <div className="post-image overflow-hidden">
            <img 
              src={post.image} 
              alt="" 
              className="w-full h-48 object-cover transition-transform duration-300"
            />
          </div>
        )}
        <div className="post-content p-6 flex flex-col flex-grow">
          <div className="post-content-wrap flex-grow">
            <h3 className="post-title font-serif text-xl mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <div className="post-excerpt">
              <p className="text-sm leading-relaxed text-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </div>
          <div className="post-info mt-4 pt-4 flex-shrink-0">
            <span className="text-xs text-secondary-foreground tracking-wider">
              {post.date}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 