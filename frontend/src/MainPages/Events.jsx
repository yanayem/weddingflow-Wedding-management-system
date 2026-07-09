import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eventTypes } from "../data/mockData";

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-rose-600 uppercase tracking-tighter">
          Our Special Events
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2 font-medium">
          We specialize in managing a variety of wedding-related events, ensuring each one is unique and unforgettable.
        </p>
      </div>

      {eventTypes.map((cat, idx) => (
        <div key={idx} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-xl shadow-sm">
              <FontAwesomeIcon icon={cat.icon} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{cat.category}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.events.map((event, eIdx) => (
              <div key={eIdx} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-white text-2xl font-bold">{event.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6 font-medium leading-relaxed">{event.desc}</p>
                  <button className="text-rose-600 font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300 uppercase tracking-widest text-xs">
                    Plan This Event
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
