import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const images = [
    'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6968945/pexels-photo-6968945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1005405/pexels-photo-1005405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/277477/pexels-photo-277477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/161815/moss-lichen-green-plant-161815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/164516/pexels-photo-164516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6446976/pexels-photo-6446976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-8">
      <Header />
      
      <main>
        <section className="py-16 sm:py-24">
          <h1 className="font-serif text-4xl text-center mb-16 tracking-widest text-stone-800 dark:text-stone-200">
            光影集
          </h1>
          {/* Masonry-like grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <img 
                key={index}
                className="mb-4 sm:mb-6 rounded-sm shadow-sm shadow-stone-200 dark:shadow-dark-800" 
                src={image} 
                alt=""
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 