import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';
import { getAllMDXPosts } from './lib/mdx';
import HomeClient from './components/HomeClient';

export default async function Home() {
  // 获取所有文章（硬编码 + MDX）
  const hardcodedPosts = getAllPosts();
  const mdxPosts = await getAllMDXPosts();
  
  // 合并并排序所有文章
  const allPosts = [...hardcodedPosts, ...mdxPosts].sort((a, b) => 
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
