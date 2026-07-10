import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, userData } = useAuth();
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
    try {
      await axios.patch(`/api/bookings/${bookingId}/status`, { status: newStatus });
      toast.success(`Booking ${newStatus}!`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (!userData) return <div className="p-20 text-center text-rose-500 font-bold">Please login to view your profile.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-white shadow-xl p-8 border border-rose-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-rose-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-rose-100 shadow-inner overflow-hidden">
            {userData?.profilePic ? (
              <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              userData?.name?.charAt(0) || "U"
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
            <p className="text-gray-500">{userData?.email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider">
                {userData?.role}
              </span>
              {userData?.phone && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold">
                  {userData.phone}
                </span>
              )}
            </div>
            {userData?.bio && <p className="mt-3 text-sm text-gray-600 max-w-md">{userData.bio}</p>}
            {userData?.address && <p className="mt-1 text-xs text-gray-400 font-medium">📍 {userData.address}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/edit-profile"
            className="bg-white text-rose-600 border border-rose-200 px-6 py-3 font-bold hover:bg-rose-50 transition"
          >
            Edit Profile
          </Link>
          {userData?.role === 'vendor' && (
            <>
              <Link
                to="/vendor-dashboard"
                className="bg-gray-100 text-gray-700 px-6 py-3 font-bold hover:bg-gray-200 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/vendor-profile-setup"
                className="bg-rose-600 text-white px-6 py-3 font-bold hover:bg-rose-700 transition shadow-lg"
              >
                Business Setup
              </Link>
            </>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {userData?.role === 'vendor' ? 'Incoming Requests' : 'My Bookings'}
        <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5">{bookings.length}</span>
      </h2>

      {loading ? (
        <div className="text-center py-20">
            <div className="animate-spin h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-gray-50 p-16 text-center text-gray-500 border-2 border-dashed border-gray-200">
          <p className="text-xl font-medium">No records found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-xl text-gray-800">
                    {userData.role === 'vendor'
                      ? (booking.user?.name || "Anonymous Client")
                      : (booking.vendor?.businessName || "Wedding Service")}
                  </h3>
                  <span className={`px-3 py-0.5 text-[10px] font-bold uppercase ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500">
                    <p><span className="font-medium text-gray-700">Date:</span> {new Date(booking.eventDate).toLocaleDateString()}</p>
                    {booking.message && <p className="col-span-full mt-2 italic">"{booking.message}"</p>}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-end gap-3 w-full md:w-auto">
                {userData.role !== 'vendor' && (
                  <p className="text-rose-600 font-extrabold text-2xl hidden md:block">
                    {booking.vendor?.pricing || "TBD"}
                  </p>
                )}

                {userData.role === 'vendor' && booking.status === 'pending' && (
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                      className="flex-1 md:flex-none bg-green-500 text-white px-4 py-2 font-bold text-sm hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                      className="flex-1 md:flex-none bg-gray-200 text-gray-700 px-4 py-2 font-bold text-sm hover:bg-gray-300 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {userData.role === 'vendor' && booking.status === 'confirmed' && (
                  <button
                    onClick={() => updateBookingStatus(booking._id, 'completed')}
                    className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 font-bold text-sm hover:bg-blue-600 transition"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
