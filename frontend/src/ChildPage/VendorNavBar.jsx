import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChartLine, faCalendarCheck, faStore, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";

const VENDOR_MENU = [
  { name: "Dashboard", path: "/vendor-dashboard", icon: faChartLine },
  { name: "Bookings", path: "/profile", icon: faCalendarCheck },
  { name: "Business", path: "/vendor-profile-setup", icon: faStore },
  { name: "My Profile", path: "/edit-profile", icon: faUser },
];

const VendorNavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Sign out failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white text-gray-900 shadow-md px-4 py-3 border-b border-rose-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Badge */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-rose-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faHeart} className="text-sm" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-lg font-black uppercase tracking-tighter italic leading-none text-gray-900">Wedding</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none text-rose-500">Flow</span>
            </div>
          </Link>
          <span className="bg-rose-500 text-[10px] font-black uppercase px-2 py-0.5 text-white tracking-widest ml-2">Vendor Hub</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {VENDOR_MENU.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`py-2 px-4 font-bold uppercase tracking-widest text-[11px] transition-all flex items-center gap-2 ${
                location.pathname === item.path
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-100'
                  : 'hover:bg-rose-50 text-gray-500 hover:text-rose-600'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-sm" />
              {item.name}
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>
          <button
            onClick={handleLogout}
            className="text-[11px] font-black uppercase px-4 py-2 hover:bg-rose-50 text-rose-500 transition-all"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="hidden lg:flex items-center gap-3 border-l border-gray-100 pl-6 ml-4">
           <div className="text-right">
             <p className="text-[11px] font-black uppercase tracking-widest leading-none text-gray-900">{userData?.name || "Vendor"}</p>
             <p className="text-[9px] text-gray-400 font-bold">{userData?.email}</p>
           </div>
           <div className="w-10 h-10 bg-rose-500 flex items-center justify-center font-black overflow-hidden border-2 border-rose-100 shadow-sm text-white">
             {userData?.profilePic ? (
               <img src={userData.profilePic} alt="" className="w-full h-full object-cover" />
             ) : (
               userData?.name?.charAt(0) || "V"
             )}
           </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-2xl text-rose-500" onClick={() => setOpenNav(!openNav)}>
          <FontAwesomeIcon icon={openNav ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      {openNav && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white p-4 border-t border-rose-50 shadow-2xl animate-slideDown">
          <div className="flex flex-col gap-1">
            {VENDOR_MENU.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setOpenNav(false)}
                className={`py-3 px-4 font-bold uppercase tracking-widest text-sm flex items-center gap-3 ${
                  location.pathname === item.path ? 'bg-rose-500 text-white' : 'text-gray-600 hover:bg-rose-50'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.name}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <button onClick={handleLogout} className="w-full border border-rose-200 text-rose-500 py-3 font-bold uppercase tracking-widest text-sm">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default VendorNavBar;
