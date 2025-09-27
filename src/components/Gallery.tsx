import React from 'react';

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80",
      title: "Film Production Set"
    },
    {
      url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80",
      title: "Movie Theater"
    },
    {
      url: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&q=80",
      title: "Camera Equipment"
    },
    {
      url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80",
      title: "Film Studio"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Capturing moments from the South Indian film industry</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-[300px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;