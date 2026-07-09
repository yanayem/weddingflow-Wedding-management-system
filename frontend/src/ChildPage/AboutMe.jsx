import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faAward, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

import { aboutStats } from "../data/mockData";

const AboutMe = () => {
  const stats = aboutStats;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-rose-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Dream Wedding, <br /> Our Passionate Mission.</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            WeddingFlow is more than just a platform; it's a dedicated team committed to making your special day seamless, beautiful, and truly unforgettable.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-rose-500 pl-4">Our Journey</h2>
            <p className="text-gray-600 mb-4 text-lg">
              Founded in 2014, WeddingFlow started as a small project to help friends find local florists. Today, it has grown into a comprehensive platform connecting thousands of couples with elite vendors across the country.
            </p>
            <p className="text-gray-600 text-lg">
              We believe every love story is unique. Our mission is to provide the tools and connections you need to tell your story in the most beautiful way possible, without the stress of planning.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-rose-500 text-3xl mb-4">
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.count}</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">The Hearts Behind WeddingFlow</h2>
          <p className="text-gray-600 mt-2">Professional planners and tech enthusiasts working for you.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((m) => (
            <div key={m} className="bg-white rounded-2xl overflow-hidden shadow-md group">
              <div className="h-64 bg-rose-100 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-rose-300 italic">Member Portrait</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-800">Team Member {m}</h3>
                <p className="text-rose-500">Expert Coordinator</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
