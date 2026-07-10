import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faStar, faClock, faCheckDouble, faBriefcase, faEdit } from "@fortawesome/free-solid-svg-icons";

const VendorDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        axios.get(`/api/vendors/stats/${currentUser.uid}`),
        axios.get(`/api/bookings/vendor/${currentUser.uid}`)
      ]);
      setStats(statsRes.data);
      // Sort by date and take last 5
      const sorted = bookingsRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentBookings(sorted.slice(0, 5));
    } catch (err) {
      toast.error("Failed to load dashboard data");
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchData();
  }, [currentUser]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/bookings/${id}/status`, { status });
      toast.success(`Booking ${status}!`);
      fetchData(); // Refresh data
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Loading Hub...</p>
      </div>
    </div>
  );

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
        {/* Recent Bookings Section */}
        <div className="lg:col-span-2 bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-black uppercase tracking-tighter text-gray-800">Recent Activity</h3>
            <Link to="/profile" className="text-[10px] font-black uppercase text-pink-500 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.length === 0 ? (
              <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">
                No recent bookings
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-rose-50/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-gray-900 uppercase tracking-tight">{booking.user?.name || "Client"}</span>
                      <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Event Date: {new Date(booking.eventDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking._id, 'confirmed')}
                          className="px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition shadow-lg shadow-green-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, 'cancelled')}
                          className="px-4 py-2 bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => updateStatus(booking._id, 'completed')}
                        className="px-4 py-2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition"
                      >
                        Complete
                      </button>
                    )}
                    <span className="text-sm font-black text-gray-800 italic ml-2">${booking.totalPrice}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* trust score column */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center justify-center">
              <h6 className="mb-4 uppercase tracking-widest text-[10px] font-black text-gray-400">Trust Score</h6>
              <h1 className="text-7xl font-black text-pink-500 mb-2">{stats?.averageRating || "N/A"}</h1>
              <div className="flex justify-center text-yellow-500 text-xl mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < Math.round(stats?.averageRating) ? "opacity-100" : "opacity-10"} />
                  ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold italic leading-tight">
                  Based on {stats?.totalReviews} verified reviews
              </p>
          </div>

          <div className="bg-gray-900 p-8 shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4 uppercase italic">Pro Tips</h3>
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-4">
                  Reply to requests within <span className="text-rose-400">1 hour</span> to increase your visibility by <span className="text-rose-400">40%</span>.
                </p>
                <Link to="/vendor-profile-setup" className="text-[10px] font-black uppercase text-rose-500 hover:text-white transition-colors">Optimize Profile →</Link>
              </div>
              <FontAwesomeIcon icon={faBriefcase} className="absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
