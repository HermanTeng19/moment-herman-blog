import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';
import HomeClient from './components/HomeClient';

export default async function Home() {
  // 获取所有文章（已经包含了文件系统和硬编码文章）
  const allPosts = getAllPosts();

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
