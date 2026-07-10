import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faCalendarAlt, faSignOutAlt, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!currentUser || !userData) return;
    try {
      const endpoint = userData.role === 'vendor'
        ? `/api/bookings/vendor/${currentUser.uid}`
        : `/api/bookings/user/${currentUser.uid}`;

      const res = await axios.get(endpoint);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchBookings();
    }
  }, [currentUser, userData]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    const updatePromise = axios.patch(`/api/bookings/${bookingId}/status`, { status: newStatus });

    toast.promise(updatePromise, {
      loading: `Updating booking to ${newStatus}...`,
      success: `Booking ${newStatus}!`,
      error: "Failed to update status"
    });

    try {
      await updatePromise;
      fetchBookings();
    } catch (err) {
      // Handled by toast.promise
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign out failed");
    }
  };

  if (!userData) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-rose-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Premium Profile Header */}
      <div className="bg-white border-b border-rose-100 shadow-sm mb-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white overflow-hidden">
                  {userData?.profilePic ? (
                    <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userData?.name?.charAt(0) || "U"
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg text-rose-500">
                   <FontAwesomeIcon icon={userData?.role === 'vendor' ? faBriefcase : faUser} className="text-sm" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
                    {userData?.role === 'vendor' && userData?.businessName ? userData.businessName : userData?.name}
                  </h1>
                  <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {userData?.role}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm font-bold">
                    <FontAwesomeIcon icon={faEnvelope} className="text-rose-400 w-4" />
                    {userData?.email}
                  </div>
                  {userData?.phone && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm font-bold">
                      <FontAwesomeIcon icon={faPhone} className="text-rose-400 w-4" />
                      {userData.phone}
                    </div>
                  )}
                  {userData?.address && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-xs font-semibold">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-400 w-4" />
                      {userData.address}
                    </div>
                  )}
                </div>

                {userData?.bio && (
                  <p className="mt-6 text-sm text-gray-600 max-w-lg leading-relaxed italic border-l-4 border-rose-100 pl-4">
                    "{userData.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Link
                to="/edit-profile"
                className="flex-1 text-center bg-white text-gray-800 border-2 border-gray-100 px-8 py-3 font-black uppercase tracking-widest text-[11px] hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm"
              >
                Edit Profile
              </Link>
              {userData?.role === 'vendor' && (
                <Link
                  to="/vendor-dashboard"
                  className="flex-1 text-center bg-pink-500 text-white px-8 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-pink-600 transition-all shadow-lg shadow-pink-200"
                >
                  Vendor Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex-1 text-center bg-gray-900 text-white px-8 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-black transition-all shadow-lg"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Bookings Section */}
        <div className="mb-8 flex items-end justify-between border-b-2 border-gray-100 pb-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">
              {userData?.role === 'vendor' ? 'Service Requests' : 'My Event Bookings'}
            </h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Manage your upcoming events and collaborations
            </p>
          </div>
          <div className="bg-white border-2 border-gray-100 px-4 py-2 font-black text-rose-500 shadow-sm">
            {bookings.length} {bookings.length === 1 ? 'RECORD' : 'RECORDS'}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-100 animate-pulse border border-gray-200"></div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-20 text-center border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl text-gray-300" />
            </div>
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest italic">No Bookings Found</p>
            {userData.role !== 'vendor' && (
              <Link to="/vendor" className="mt-6 inline-block bg-rose-500 text-white px-8 py-3 font-black uppercase tracking-widest text-xs">
                Browse Vendors
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="group bg-white border border-gray-100 hover:border-rose-200 transition-all shadow-sm hover:shadow-xl flex flex-col md:flex-row overflow-hidden">
                {/* Status Sidebar */}
                <div className={`w-2 md:w-3 ${
                   booking.status === 'confirmed' ? 'bg-green-500' :
                   booking.status === 'cancelled' ? 'bg-red-500' :
                   booking.status === 'completed' ? 'bg-blue-500' :
                   'bg-orange-500'
                }`}></div>

                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        ID: #{booking._id.slice(-6)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                      {userData.role === 'vendor'
                        ? (booking.user?.name || "Client")
                        : (booking.vendor?.businessName || "Wedding Service")}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                         <FontAwesomeIcon icon={faCalendarAlt} className="text-rose-400" />
                         {new Date(booking.eventDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2">
                         <FontAwesomeIcon icon={faEnvelope} className="text-rose-400" />
                         {userData.role === 'vendor' ? booking.user?.email : (booking.vendor?.phone || "N/A")}
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mt-4 p-4 bg-gray-50 border-l-2 border-gray-200 italic text-sm text-gray-600 font-medium">
                        "{booking.message}"
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-auto flex flex-row md:flex-col items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                       <p className="text-3xl font-black text-rose-500 italic tracking-tighter leading-none">
                         {booking.totalPrice ? `$${booking.totalPrice}` : (booking.vendor?.pricing || "TBD")}
                       </p>
                    </div>

                    {userData.role === 'vendor' && booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                          className="bg-green-500 text-white px-5 py-2 font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition shadow-lg shadow-green-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                          className="bg-gray-100 text-gray-500 px-5 py-2 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {userData.role === 'vendor' && booking.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(booking._id, 'completed')}
                        className="bg-blue-500 text-white px-6 py-2 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition shadow-lg shadow-blue-100"
                      >
                        Complete Job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
