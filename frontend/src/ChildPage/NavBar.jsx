import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";

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

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign out failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-pink-500 text-white shadow-xl px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-white text-pink-500 w-10 h-10 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black uppercase tracking-tighter italic leading-none">Wedding</span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] leading-none opacity-80">Flow</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {MENU_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className={`py-2 px-3 font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all ${location.pathname === item.path ? 'bg-white/20' : ''}`}
              >
                {item.name} {item.sub && <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-[10px]" />}
              </Link>

              {/* Mega Dropdown */}
              {item.sub && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white text-gray-800 shadow-2xl p-6 grid grid-cols-3 gap-6 animate-slideDown border border-rose-50">
                   {item.sub.map((cat, cIdx) => (
                     <div key={cIdx}>
                        <h4 className="font-black text-rose-500 uppercase text-[10px] mb-3 border-b border-rose-50 pb-1">{cat.category}</h4>
                        <div className="flex flex-col gap-2">
                           {cat.items.map((sub, sIdx) => (
                             <Link
                                key={sIdx}
                                to={`${item.path}/${sub.replace(/\s+/g, "-").toLowerCase()}`}
                                className="text-xs font-semibold hover:text-rose-500 transition-colors"
                             >
                               {sub}
                             </Link>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-white/10 p-1 pl-4 border border-white/20">
               <span className="text-[10px] font-black uppercase tracking-widest">Hi, {userData?.name || "User"}</span>
               <Link to={userData?.role === 'vendor' ? "/vendor-dashboard" : "/profile"}>
                  <button className="text-[10px] font-black uppercase px-3 py-1.5 hover:bg-white/20">
                    {userData?.role === 'vendor' ? "Dashboard" : "Profile"}
                  </button>
               </Link>
               <button onClick={handleLogout} className="bg-white text-pink-500 text-[10px] font-black uppercase px-4 py-1.5 shadow-lg">Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-white text-pink-500 px-8 py-2 font-black uppercase tracking-widest text-xs hover:bg-rose-50 transition-all">Log In</button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-2xl" onClick={() => setOpenNav(!openNav)}>
          <FontAwesomeIcon icon={openNav ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      {openNav && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-pink-600 p-4 border-t border-pink-400 shadow-2xl animate-slideDown">
          <div className="flex flex-col gap-2">
            {MENU_ITEMS.map((item, idx) => (
              <Link key={idx} to={item.path} onClick={() => setOpenNav(false)} className="py-3 px-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10">
                {item.name}
              </Link>
            ))}
            <hr className="my-2 border-pink-400" />
            {currentUser ? (
              <button onClick={handleLogout} className="w-full bg-white text-pink-600 py-3 font-bold uppercase tracking-widest text-sm">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setOpenNav(false)}>
                <button className="w-full bg-white text-pink-600 py-3 font-bold uppercase tracking-widest text-sm">Log In</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
