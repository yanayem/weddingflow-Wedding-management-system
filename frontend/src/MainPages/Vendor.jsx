import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { faAngleDown, faAngleUp, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Vendor = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

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

  const handleSubcategoryClick = (catPath, subName) => {
    const link = `${catPath}/${subName.replace(/\s+/g, "-").toLowerCase()}`;
    setOpenIndex(null);
    navigate(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-rose-600 mb-2">Vendor Categories</h1>
        <p className="text-gray-600">Explore our wide range of professional wedding services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 ${cat.bgColor}`}
          >
            <div
              className="flex flex-row-reverse items-center justify-between cursor-pointer h-44"
              onClick={() => toggleDropdown(index)}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-2/5 h-full object-cover rounded-l-3xl shadow-inner"
              />

              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-between">
                  {cat.title}
                  <FontAwesomeIcon
                    icon={openIndex === index ? faAngleUp : faAngleDown}
                    className="text-lg opacity-50"
                  />
                </h2>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </div>

            {openIndex === index && (
              <div className={`mx-6 mb-6 p-4 rounded-2xl animate-slideDown ${cat.dropdownbg}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubcategoryClick(cat.path, sub)}
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
