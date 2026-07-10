import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import category images
import vanue from "../assets/Venues.webp";
import Photographers from "../assets/photograph.jpeg";
import Caterers from "../assets/Caterers.jpeg";
import MakeupArtists from "../assets/Makeup_Artists.jpeg";
import Decorators from "../assets/vanue.webp";
import MusicDj from "../assets/music.jpg";
import Invitations from "../assets/Invitations.jpg";
import Transport from "../assets/car.avif";
import WeddingPlanners from "../assets/wedding_planner.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faAngleRight, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const Vendor = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const { currentUser } = useAuth();

  const categories = [
    {
      id: 1,
      title: "Photography",
      path: "/vendor",
      desc: "Capture your wedding memories",
      img: Photographers,
      bgColor: "bg-rose-300",
      dropdownbg: "bg-rose-200",
      subcategories: ["Groom Photography", "Bride Photography", "Event Photography", "Drone Photography", "Pre-Wedding Shoot"],
    },
    {
      id: 2,
      title: "Caterers",
      path: "/vendor",
      desc: "Delicious food for your wedding",
      img: Caterers,
      bgColor: "bg-yellow-200",
      dropdownbg: "bg-yellow-100",
      subcategories: ["Buffet", "Desserts", "Drinks", "Custom Cakes", "Food Trucks"],
    },
    {
      id: 3,
      title: "Makeup Artists",
      path: "/vendor",
      desc: "Beauty services for bride & family",
      img: MakeupArtists,
      bgColor: "bg-pink-300",
      dropdownbg: "bg-pink-200",
      subcategories: ["Bridal Makeup", "Family Makeup", "Groom Makeup", "Hair Styling"],
    },
    {
      id: 4,
      title: "Decorators",
      path: "/vendor",
      desc: "Beautiful wedding decorations",
      img: Decorators,
      bgColor: "bg-green-300",
      dropdownbg: "bg-green-200",
      subcategories: ["Stage Decor", "Floral Decor", "Lighting", "Table Setup", "Theme Decor"],
    },
    {
      id: 5,
      title: "Musicians / DJs",
      path: "/vendor",
      desc: "Music and entertainment",
      img: MusicDj,
      bgColor: "bg-blue-300",
      dropdownbg: "bg-blue-200",
      subcategories: ["Live Bands", "DJ Services", "Solo Performers", "Classical Music"],
    },
    {
      id: 6,
      title: "Venues",
      path: "/vendor",
      desc: "Perfect places for your wedding",
      img: vanue,
      bgColor: "bg-purple-300",
      dropdownbg: "bg-purple-200",
      subcategories: ["Banquet Halls", "Hotels", "Outdoor Gardens", "Beach Weddings"],
    },
    {
      id: 7,
      title: "Invitations / Print",
      path: "/vendor",
      desc: "Wedding cards & printing",
      img: Invitations,
      bgColor: "bg-orange-300",
      dropdownbg: "bg-orange-200",
      subcategories: ["Wedding Cards", "Save the Date", "Thank You Cards", "Custom Printing"],
    },
    {
      id: 8,
      title: "Transport",
      path: "/vendor",
      desc: "Luxury & convenient transport",
      img: Transport,
      bgColor: "bg-gray-300",
      dropdownbg: "bg-gray-200",
      subcategories: ["Luxury Cars", "Limousines", "Shuttle Services", "Vintage Cars"],
    },
    {
      id: 9,
      title: "Wedding Planners",
      path: "/vendor",
      desc: "Professional wedding planning services",
      img: WeddingPlanners,
      bgColor: "bg-pink-200",
      dropdownbg: "bg-pink-100",
      subcategories: ["Full-Service Planner", "Day-of Coordinator", "Budget Planner", "Destination Planner"],
    },
  ];

  const toggleDropdown = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleSubcategoryClick = (catTitle, subName) => {
    const link = `/vendor/${catTitle.toLowerCase()}/${subName.replace(/\s+/g, "-").toLowerCase()}`;
    setOpenIndex(null);
    navigate(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Vendor Portal CTA for non-logged in or non-vendors */}
      {!currentUser && (
        <div className="mb-12 bg-gray-900 text-white rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative group">
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <FontAwesomeIcon icon={faBriefcase} />
              For Professionals
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-4">
              Are you a <span className="text-rose-500">Vendor?</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Join WeddingFlow to showcase your services, manage bookings, and reach thousands of couples.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/vendor-auth" className="flex-1">
              <button className="w-full bg-white text-gray-900 px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-rose-50 transition-all shadow-xl">
                Vendor Login
              </button>
            </Link>
            <Link to="/vendor-auth?signup=true" className="flex-1">
              <button className="w-full bg-rose-500 text-white px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20">
                Register Business
              </button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
      )}

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-rose-600 mb-2 uppercase tracking-tight">Vendor Categories</h1>
        <p className="text-gray-600 font-medium">Explore our wide range of professional wedding services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 ${cat.bgColor}`}
          >
            <div className="flex flex-row-reverse items-center justify-between h-44">
              <Link
                to={`${cat.path}/${cat.title.toLowerCase()}`}
                className="w-2/5 h-full overflow-hidden"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover rounded-l-3xl shadow-inner hover:scale-110 transition-transform duration-500"
                />
              </Link>

              <div className="flex-1 p-6 flex flex-col justify-center h-full">
                <div className="flex items-center justify-between">
                  <Link
                    to={`${cat.path}/${cat.title.toLowerCase()}`}
                    className="text-2xl font-bold text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    {cat.title}
                  </Link>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={openIndex === index ? faAngleUp : faAngleDown}
                      className="text-lg opacity-50"
                    />
                  </button>
                </div>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </div>

            {openIndex === index && (
              <div className={`mx-6 mb-6 p-4 rounded-2xl animate-slideDown ${cat.dropdownbg}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubcategoryClick(cat.title, sub)}
                      className="flex items-center gap-3 text-gray-800 hover:text-rose-600 font-medium transition text-sm py-2 px-3 rounded-xl hover:bg-white/50"
                    >
                      <FontAwesomeIcon icon={faAngleRight} className="text-xs opacity-40" />
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendor;
