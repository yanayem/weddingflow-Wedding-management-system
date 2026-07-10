import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand & Mission */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-rose-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-black uppercase tracking-tighter italic leading-none text-white">Wedding</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] leading-none text-rose-500">Flow</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            Leading the way in digital wedding management. We make planning your special day as joyful as the day itself.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Link to="/" className="hover:text-rose-400 transition">Home</Link></li>
            <li><Link to="/events" className="hover:text-rose-400 transition">Events</Link></li>
            {import.meta.env.VITE_DISABLE_VENDOR_SERVICES !== 'true' && (
              <>
                <li><Link to="/vendor" className="hover:text-rose-400 transition">Vendors</Link></li>
                <li><Link to="/vendor-auth" className="text-rose-400 font-bold hover:underline transition">Vendor Portal</Link></li>
              </>
            )}
            <li><Link to="/gallery" className="hover:text-rose-400 transition">Gallery</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Link to="/about" className="hover:text-rose-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-rose-400 transition">Contact Support</Link></li>
            <li><a href="#" className="hover:text-rose-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-rose-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
          <p className="text-sm mb-6">Subscribe to get wedding tips and special vendor offers.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 text-sm"
            />
            <button className="bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs">
        <p>© {new Date().getFullYear()} WeddingFlow. All rights reserved.</p>
        <p className="mt-2 text-gray-500">
          Crafted with love by <a href="https://github.com/yanayem" className="text-rose-400 hover:underline">Yeasin Arafat Nayem Bhuiyan</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
