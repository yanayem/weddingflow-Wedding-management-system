import React, { useState } from "react";
import img from "../assets/loveWedding.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { homeFeatures } from "../data/mockData";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/vendor/${search.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  const features = homeFeatures;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="w-full h-[600px] relative overflow-hidden">
        <img src={img} alt="Wedding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">
            Plan Your Dream Wedding
          </h1>
          <p className="text-xl md:text-3xl font-light max-w-3xl opacity-90">
            The most trusted platform to discover, compare, and book your ideal wedding vendors.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center gap-3 mt-12 bg-white/10 backdrop-blur-md p-4 rounded-3xl w-full max-w-3xl shadow-2xl border border-white/20"
          >
            <div className="w-full bg-white rounded-2xl overflow-hidden">
                <input
                  type="search"
                  placeholder="Search for Photographers, Venues, etc..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-4 text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-400 font-medium"
                />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-pink-500 hover:bg-pink-600 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
            >
              <FontAwesomeIcon icon={faSearch} />
              Find
            </button>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 text-3xl mb-8 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-4">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed text-lg px-6 font-medium opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-rose-50 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 uppercase tracking-tight">Are you a Wedding Professional?</h2>
          <p className="text-xl text-gray-600 mb-12 font-normal max-w-2xl mx-auto opacity-80">
            Join the elite network of vendors on WeddingFlow and reach thousands of couples planning their special day right now.
          </p>
          <Link to="/signup">
            <button className="px-12 py-5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xl font-black shadow-xl hover:scale-105 transition-all duration-300 shadow-pink-500/30">
                Register as a Vendor
            </button>
          </Link>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
