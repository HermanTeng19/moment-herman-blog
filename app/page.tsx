import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import OrigamiBackground from './components/OrigamiBackground';
import { getAllPosts } from './lib/posts';
import { getAllMarkdownPosts } from './lib/mdx';
import HomeClient from './components/HomeClient';

// 解析中文日期格式的函数
function parseChineseDate(dateStr: string): Date {
  // 处理 "2024年12月11日" 和 "2024年12.18日" 格式
  const match = dateStr.match(/(\d{4})年(\d{1,2})[月\.](\d{1,2})日/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  
  // 如果无法解析，返回一个很早的日期
  console.warn(`无法解析日期格式: ${dateStr}`);
  return new Date(1900, 0, 1);
}

export default async function Home() {
  // 获取所有文章（硬编码 + Markdown）
  const hardcodedPosts = getAllPosts();
  const markdownPosts = await getAllMarkdownPosts();
  
  // 合并并排序所有文章
  const allPosts = [...hardcodedPosts, ...markdownPosts].sort((a, b) => {
    const dateA = parseChineseDate(a.date);
    const dateB = parseChineseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

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
