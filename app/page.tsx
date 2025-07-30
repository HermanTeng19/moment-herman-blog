import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';
import { getAllMarkdownPosts } from './lib/mdx';
import HomeClient from './components/HomeClient';

export default async function Home() {
  // 获取所有文章（硬编码 + Markdown）
  const hardcodedPosts = getAllPosts();
  const markdownPosts = await getAllMarkdownPosts();
  
  // 合并并排序所有文章
  const allPosts = [...hardcodedPosts, ...markdownPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <OrigamiBackground />
      
      {/* Transparent Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <HomeClient posts={allPosts} />
    </>
  );
}
