import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../ChildPage/Breadcrumb";

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
  const [breadcrumbPaths, setBreadcrumbPaths] = useState([{ name: "Home", link: "/" }]);

  const categories = [
    {
      id: 1,
      title: "Photography",
      desc: "Capture your wedding memories",
      img: Photographers,
      bgColor: "bg-rose-300",
      dropdownbg: "bg-rose-200",
      subcategories: [
        { name: "Groom Photography", link: "/photography/groom" },
        { name: "Bride Photography", link: "/photography/bride" },
        { name: "Event Photography", link: "/photography/event" },
        { name: "Drone Photography", link: "/photography/drone" },
        { name: "Pre-Wedding Shoot", link: "/photography/pre-wedding" },
      ],
    },
    {
      id: 2,
      title: "Caterers",
      desc: "Delicious food for your wedding",
      img: Caterers,
      bgColor: "bg-yellow-200",
      dropdownbg: "bg-yellow-100",
      subcategories: [
        { name: "Buffet", link: "/caterers/buffet" },
        { name: "Desserts", link: "/caterers/desserts" },
        { name: "Drinks", link: "/caterers/drinks" },
        { name: "Custom Cakes", link: "/caterers/custom-cakes" },
        { name: "Food Trucks", link: "/caterers/food-trucks" },
      ],
    },
    {
      id: 3,
      title: "Makeup Artists",
      desc: "Beauty services for bride & family",
      img: MakeupArtists,
      bgColor: "bg-pink-300",
      dropdownbg: "bg-pink-200",
      subcategories: [
        { name: "Bridal Makeup", link: "/makeup/bridal" },
        { name: "Family Makeup", link: "/makeup/family" },
        { name: "Groom Makeup", link: "/makeup/groom" },
        { name: "Hair Styling", link: "/makeup/hair-styling" },
      ],
    },
    {
      id: 4,
      title: "Decorators",
      desc: "Beautiful wedding decorations",
      img: Decorators,
      bgColor: "bg-green-300",
      dropdownbg: "bg-green-200",
      subcategories: [
        { name: "Stage Decor", link: "/decorators/stage" },
        { name: "Floral Decor", link: "/decorators/floral" },
        { name: "Lighting", link: "/decorators/lighting" },
        { name: "Table Setup", link: "/decorators/table-setup" },
        { name: "Theme Decor", link: "/decorators/theme" },
      ],
    },
    {
      id: 5,
      title: "Musicians / DJs",
      desc: "Music and entertainment",
      img: MusicDj,
      bgColor: "bg-blue-300",
      dropdownbg: "bg-blue-200",
      subcategories: [
        { name: "Live Bands", link: "/music/live-bands" },
        { name: "DJ Services", link: "/music/dj" },
        { name: "Solo Performers", link: "/music/solo" },
        { name: "Classical Music", link: "/music/classical" },
      ],
    },
    {
      id: 6,
      title: "Venues",
      desc: "Perfect places for your wedding",
      img: vanue,
      bgColor: "bg-purple-300",
      dropdownbg: "bg-purple-200",
      subcategories: [
        { name: "Banquet Halls", link: "/venues/banquet" },
        { name: "Hotels", link: "/venues/hotels" },
        { name: "Outdoor Gardens", link: "/venues/gardens" },
        { name: "Beach Weddings", link: "/venues/beach" },
      ],
    },
    {
      id: 7,
      title: "Invitations / Print",
      desc: "Wedding cards & printing",
      img: Invitations,
      bgColor: "bg-orange-300",
      dropdownbg: "bg-orange-200",
      subcategories: [
        { name: "Wedding Cards", link: "/print/wedding-cards" },
        { name: "Save the Date", link: "/print/save-the-date" },
        { name: "Thank You Cards", link: "/print/thank-you" },
        { name: "Custom Printing", link: "/print/custom" },
      ],
    },
    {
      id: 8,
      title: "Transport",
      desc: "Luxury & convenient transport",
      img: Transport,
      bgColor: "bg-gray-300",
      dropdownbg: "bg-gray-200",
      subcategories: [
        { name: "Luxury Cars", link: "/transport/luxury-cars" },
        { name: "Limousines", link: "/transport/limousines" },
        { name: "Shuttle Services", link: "/transport/shuttle" },
        { name: "Vintage Cars", link: "/transport/vintage" },
      ],
    },
    {
      id: 9,
      title: "Wedding Planners",
      desc: "Professional wedding planning services",
      img: WeddingPlanners,
      bgColor: "bg-pink-200",
      dropdownbg: "bg-pink-100",
      subcategories: [
        { name: "Full-Service Planner", link: "/planners/full-service" },
        { name: "Day-of Coordinator", link: "/planners/day-of" },
        { name: "Budget Planner", link: "/planners/budget" },
        { name: "Destination Planner", link: "/planners/destination" },
      ],
    },
  ];

  const toggleDropdown = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleSubcategoryClick = (cat, sub) => {
    setBreadcrumbPaths([
      { name: "Home", link: "/" },
      { name: cat.title, link: `/${cat.title.toLowerCase()}` },
      { name: sub.name, link: sub.link },
    ]);
    navigate(sub.link);
  };

  const handleBreadcrumbClick = (index) => {
    const path = breadcrumbPaths[index];
    setBreadcrumbPaths((prev) => prev.slice(0, index + 1));
    navigate(path.link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb paths={breadcrumbPaths} onClickPath={handleBreadcrumbClick} />

      <h1 className="text-4xl font-bold py-2 text-rose-500 mb-4">Wedding Categories</h1>

      {/* Cards grid: 1 col on small, 2 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`card rounded-lg ${cat.bgColor}`}
          >
            {/* Header: flex row, image right 30% */}
            <div
              className="flex flex-row-reverse items-center gap-4 cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              {/* Image on right */}
              <img
                src={cat.img}
                alt={cat.title}
                className="w-1/3 h-40 object-cover rounded-l-[77px] rounded-r-none"
              />

              {/* Text on left */}
              <div className="flex-1 text-left px-4">
                <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-x-4">
                  {cat.title}
                  <FontAwesomeIcon
                    icon={openIndex === index ? faAngleUp : faAngleDown}
                    className="text-2xl ml-0"
                  />
                </h2>
                <p className="text-gray-700 mt-2">{cat.desc}</p>
              </div>
            </div>

            {/* Dropdown */}
            {openIndex === index && (
              <div className={`m-4 p-3 rounded-xl ${cat.dropdownbg}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cat.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubcategoryClick(cat, sub)}
                      className="flex items-center gap-2 text-gray-900 hover:text-rose-600 transition w-full text-left px-2 py-1 rounded-md"
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                      {sub.name}
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