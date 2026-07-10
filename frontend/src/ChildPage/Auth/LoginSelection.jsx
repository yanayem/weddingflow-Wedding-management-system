import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBriefcase, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl mb-6 text-rose-500 animate-bounce">
            <FontAwesomeIcon icon={faHeart} className="text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic mb-4">
            Welcome to <span className="text-rose-500">Wedding</span>Flow
          </h1>
          <p className="text-gray-500 font-medium text-lg">Please choose how you would like to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Couple/User Card */}
          <div className="group bg-white rounded-[40px] p-8 shadow-2xl hover:shadow-rose-200/50 transition-all duration-500 border border-transparent hover:border-rose-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 text-4xl mb-8 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight">I am a Couple</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Planning your dream wedding? Sign in to manage your bookings and find the best vendors.
            </p>
            <Link to="/user-auth" className="w-full">
              <button className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-200">
                Couple Login
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>

            {/* Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          {/* Vendor Card */}
          <div className="group bg-gray-900 rounded-[40px] p-8 shadow-2xl hover:shadow-gray-400/20 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-rose-400 text-4xl mb-8 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">I am a Vendor</h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-10">
              Are you a professional? Access your dashboard to manage services and grow your business.
            </p>
            <Link to="/vendor-auth" className="w-full">
              <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-50 transition-all flex items-center justify-center gap-3 shadow-xl">
                Vendor Portal
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>

            {/* Decoration */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>

        <div className="mt-12 text-center">
            <Link to="/" className="text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-rose-500 transition-colors">
              ← Back to Homepage
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
