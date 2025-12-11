import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const MENU_ITEMS = [
  { name: "Home", path: "/" },
   { 
    name: "Events", 
    path: "/events",
    sub: [
      { category: "Ceremony", items: ["Wedding Ceremony", "Engagement", "Reception"] },
      { category: "Parties", items: ["Bachelor Party", "Bachelorette Party", "Pre-Wedding Party"] },
      { category: "Special", items: ["Anniversary", "Renewal Vows", "Surprise Events"] },
    ]
  },
  { 
    name: "Vendors", 
    path: "/vendor",
    sub: [
      { category: "Photography", items: ["Groom Photography", "Bride Photography", "Event Photography", "Drone Photography", "Pre-Wedding Shoot"] },
      { category: "Caterers", items: ["Buffet", "Desserts", "Drinks", "Custom Cakes", "Food Trucks"] },
      { category: "Makeup Artists", items: ["Bridal Makeup", "Family Makeup", "Groom Makeup", "Hair Styling"] },
      { category: "Decorators", items: ["Stage Decor", "Floral Decor", "Lighting", "Table Setup", "Theme Decor"] },
      { category: "Musicians / DJs", items: ["Live Bands", "DJ Services", "Solo Performers", "Classical Music"] },
      { category: "Venues", items: ["Banquet Halls", "Hotels", "Outdoor Gardens", "Beach Weddings"] },
      { category: "Invitations / Print", items: ["Wedding Cards", "Save the Date", "Thank You Cards", "Custom Printing"] },
      { category: "Transport", items: ["Luxury Cars", "Limousines", "Shuttle Services", "Vintage Cars"] },
      { category: "Wedding Planners", items: ["Full-Service Planner", "Day-of Coordinator", "Budget Planner", "Destination Planner"] },
    ]
  },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const NavBar = ({ ThemeToggle }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-pink-300 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-white hover:text-rose-100">
          WeddingFlow
        </Link>

        {/* Center Menu */}
        <ul className="hidden md:flex gap-6 items-center font-medium text-sm md:text-lg mx-auto">
          {MENU_ITEMS.map((item, idx) => (
            <li
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={`hover:text-white transition ${
                  location.pathname === item.path ? "text-white font-bold border-b-2 border-white" : ""
                }`}
              >
                {item.name}
              </Link>

              {/* Dropdown */}
              {item.sub && openDropdown === item.name && (
                <ul className="absolute left-1/2 mt-2.5 w-max bg-white shadow-lg border border-pink-200 rounded-b-xl p-4 flex gap-6 flex-wrap max-w-[90vw] -translate-x-1/2">
                  {item.sub.map((cat, cIdx) => (
                    <li key={cIdx} className="min-w-[180px]">
                      <span className="font-semibold mb-2 block text-pink-600 hover:text-pink-500 cursor-pointer">
                        {cat.category}
                      </span>
                      <ul className="flex flex-col gap-1">
                        {cat.items.map((subItem, sIdx) => (
                          <li key={sIdx}>
                            <Link
                              to={`/vendor/${subItem.replace(/\s+/g, "-").toLowerCase()}`}
                              className="block text-sm py-1 px-2 rounded hover:bg-pink-50 hover:border-l-2 hover:border-pink-400 transition"
                            >
                              {subItem}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Login + ThemeToggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:block bg-pink-500 p-2 rounded-xl font-bold text-gray-100 hover:bg-pink-600 transition text-sm md:text-base"
          >
            Login
          </Link>
          {ThemeToggle && <ThemeToggle />}
          <button
            className="md:hidden mr-12 text-white text-2xl font-bold hover:text-rose-100 transition"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <ul className="md:hidden bg-pink-200 w-full p-4 flex flex-col gap-2">
          {MENU_ITEMS.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className="block py-2 px-3 rounded hover:bg-pink-300"
                onClick={() => setMobileMenu(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              className="block py-2 px-3 rounded bg-pink-500 text-white hover:bg-pink-600"
              onClick={() => setMobileMenu(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
