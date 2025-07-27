import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-8">
      <Header />
      
      <main>
        <section className="py-24 sm:py-32">
          <div className="max-w-xl mx-auto text-center">
            <img 
              src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="" 
              className="mx-auto rounded-full mb-8 shadow-md shadow-stone-200 w-36 h-36 object-cover"
            />
            <h1 className="font-serif text-3xl mb-6 text-stone-800">关于我</h1>
            <div className="text-base leading-loose text-stone-600 space-y-4">
              <p>你好，我是林间。一个喜欢用文字和镜头记录生活的观察者。</p>
              <p>我相信，生命中最深刻的感动，往往隐藏在最平凡的日常之中。这个小站是我的精神角落，用来安放那些 fleeting 的思绪和不期而遇的美好。</p>
              <p>感谢你的来访。</p>
            </div>
            <div className="mt-10">
              <a 
                href="mailto:contact@example.com" 
                className="text-sm tracking-widest text-stone-500 hover:text-stone-800 transition-colors duration-300"
              >
                通过邮件联系我
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 