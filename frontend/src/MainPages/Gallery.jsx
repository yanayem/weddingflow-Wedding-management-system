import React from "react";
import { galleryImages } from "../data/mockData";

const Gallery = () => {
  const images = galleryImages;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-rose-600 uppercase tracking-tighter">
          Love in Focus
        </h2>
        <p className="text-gray-600 mt-2 text-lg font-normal">
          A collection of unforgettable moments from weddings we've been honored to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-72 bg-gray-100 border border-gray-200">
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-white font-bold uppercase tracking-widest text-sm">
                {img.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
