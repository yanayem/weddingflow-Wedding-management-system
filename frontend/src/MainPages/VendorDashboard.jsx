import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faStar, faClock, faCheckDouble, faBriefcase, faEdit } from "@fortawesome/free-solid-svg-icons";

const VendorDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`/api/vendors/stats/${currentUser.uid}`);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchStats();
  }, [currentUser]);

  if (loading) return <div className="p-20 text-center font-bold text-rose-500">Loading Dashboard...</div>;

  const statCards = [
    { label: "Total Bookings", value: stats?.totalBookings, icon: faCalendarCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Pending Requests", value: stats?.pendingBookings, icon: faClock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Completed Jobs", value: stats?.completedBookings, icon: faCheckDouble, color: "text-green-500", bg: "bg-green-50" },
    { label: "Total Reviews", value: stats?.totalReviews, icon: faStar, color: "text-yellow-700", bg: "bg-yellow-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Vendor Hub
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/vendor-profile-setup">
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-pink-500 text-pink-500 font-bold hover:bg-pink-50 transition-all">
                <FontAwesomeIcon icon={faEdit} />
                Edit Profile
            </button>
          </Link>
          <Link to="/profile">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100">
                <FontAwesomeIcon icon={faBriefcase} />
                Manage Bookings
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} border border-white shadow-sm p-6 flex items-center gap-5`}>
            <div className={`w-14 h-14 bg-white flex items-center justify-center text-2xl ${card.color} shadow-sm`}>
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{card.label}</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tighter">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center justify-center">
            <h6 className="mb-4 uppercase tracking-widest text-[10px] font-black text-gray-400">Customer Trust Score</h6>
            <h1 className="text-7xl font-black text-pink-500 mb-2">{stats?.averageRating || "N/A"}</h1>
            <div className="flex justify-center text-yellow-500 text-xl mb-6 gap-1">
                {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className={i < Math.round(stats?.averageRating) ? "opacity-100" : "opacity-10"} />
                ))}
            </div>
            <p className="text-xs text-gray-500 font-bold italic">
                Derived from {stats?.totalReviews} verified client reviews
            </p>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-rose-500 to-pink-700 p-10 shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Grow Your Business 🚀</h3>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <div className="mt-1 bg-white/20 p-2 text-xs"><FontAwesomeIcon icon={faCheckDouble} /></div>
                        <p className="text-rose-50 font-bold text-sm leading-relaxed">
                            Upload high-quality, professional photos to your portfolio. Vendors with 10+ photos get 4x more inquiries.
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="mt-1 bg-white/20 p-2 text-xs"><FontAwesomeIcon icon={faCheckDouble} /></div>
                        <p className="text-rose-50 font-bold text-sm leading-relaxed">
                            Reply to new booking requests within 1 hour to stay on top of the search results.
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="mt-1 bg-white/20 p-2 text-xs"><FontAwesomeIcon icon={faCheckDouble} /></div>
                        <p className="text-rose-50 font-bold text-sm leading-relaxed">
                            Keep your pricing competitive and transparent to build trust with potential couples.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
