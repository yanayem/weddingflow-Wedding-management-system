import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking State
  const [bookingDate, setBookingDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchData = async () => {
    try {
      const [vendorRes, reviewsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/vendors/${id}`),
        axios.get(`http://localhost:5000/api/reviews/${id}`)
      ]);
      setVendor(vendorRes.data);
      setReviews(reviewsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please login to book a vendor");
      navigate("/login");
      return;
    }

    setSubmittingBooking(true);
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        uid: currentUser.uid,
        vendorId: id,
        eventDate: bookingDate,
        message: bookingMessage
      });
      toast.success("Booking request sent successfully!");
      setBookingDate("");
      setBookingMessage("");
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please login to leave a review");
      return;
    }

    setSubmittingReview(true);
    try {
      await axios.post("http://localhost:5000/api/reviews", {
        uid: currentUser.uid,
        vendorId: id,
        rating,
        comment
      });
      toast.success("Review submitted!");
      setComment("");
      fetchData();
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-rose-500">Loading Details...</div>;
  if (!vendor) return <div className="p-20 text-center">Vendor not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
            {vendor.businessName}
          </h1>

          <div className="flex items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-1 text-yellow-700 font-bold bg-yellow-50 px-3 py-1 rounded-full text-sm">
              <FontAwesomeIcon icon={faStar} /> {vendor.rating || "New"}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-500" /> {vendor.address}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mb-8 h-[450px] shadow-2xl bg-gray-100">
            <img
              src={vendor.images?.[0] || "https://via.placeholder.com/800x400"}
              className="w-full h-full object-cover"
              alt={vendor.businessName}
            />
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-gray-900 mb-4 border-b border-rose-50 pb-2 uppercase tracking-tight">
              About the Vendor
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg font-medium opacity-80">
              {vendor.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {vendor.images?.slice(1).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden h-44 cursor-pointer hover:scale-105 transition duration-300 shadow-lg bg-gray-100 border border-gray-50">
                <img src={img} className="w-full h-full object-cover" alt="Gallery" />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-black text-gray-900 mb-8 border-b border-rose-50 pb-2 uppercase tracking-tight">
              Client Feedback ({reviews.length})
            </h3>

            {currentUser && userData?.role !== 'vendor' && (
              <div className="mb-10 p-8 bg-rose-50/50 border border-rose-100 rounded-3xl">
                <h6 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-4">Write a Review</h6>
                <div className="flex items-center gap-3 mb-6">
                   <p className="text-xs font-black uppercase text-gray-500 tracking-tighter">Your Rating:</p>
                   <select
                     value={rating}
                     onChange={(e) => setRating(Number(e.target.value))}
                     className="p-1 rounded bg-white border border-rose-100 text-sm font-bold text-yellow-700"
                   >
                     {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                   </select>
                </div>
                <textarea
                  className="w-full p-4 rounded-2xl border border-rose-100 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium text-sm"
                  rows={4}
                  placeholder="Your Experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-lg shadow-pink-500/20"
                  onClick={handleReview}
                  disabled={submittingReview}
                >
                  {submittingReview ? "Posting..." : "Post Review"}
                </button>
              </div>
            )}

            <div className="flex flex-col gap-6">
              {reviews.length === 0 ? (
                <p className="text-gray-500 italic text-center py-10 bg-gray-50 rounded-2xl font-medium">
                  No reviews yet. Be the first to share your experience!
                </p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="p-6 border border-gray-100 shadow-sm rounded-2xl bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-black text-gray-800 uppercase tracking-tighter text-sm">{rev.user?.name}</h4>
                      <div className="text-yellow-500 text-xs">
                         {[...Array(rev.rating)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                      </div>
                    </div>
                    <p className="text-gray-600 italic font-medium">"{rev.comment}"</p>
                    <p className="text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-8 sticky top-24 shadow-2xl border border-rose-50 rounded-3xl bg-white">
            <h4 className="mb-6 font-black text-center uppercase tracking-tighter text-pink-500 text-2xl">
              Book Now
            </h4>
            <form onSubmit={handleBooking} className="flex flex-col gap-6">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Event Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Requirements</label>
                <textarea
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium text-sm"
                  rows={4}
                  placeholder="Details..."
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                />
              </div>
              <div className="pt-4 border-t border-rose-50">
                <div className="flex justify-between items-end mb-6">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Start Price</p>
                  <p className="text-3xl text-pink-500 font-black tracking-tighter">{vendor.pricing || "TBD"}</p>
                </div>
                <button
                  type="submit"
                  disabled={submittingBooking || userData?.role === 'vendor'}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-pink-500/20 disabled:opacity-50"
                >
                  {userData?.role === 'vendor' ? "Vendor Account" : submittingBooking ? "Processing..." : "Confirm Interest"}
                </button>
                {userData?.role === 'vendor' && (
                  <p className="mt-2 text-center italic text-[10px] font-black text-rose-300 uppercase tracking-tighter">
                    Vendors cannot book other vendors.
                  </p>
                )}
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-rose-50 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-sm">
                   <FontAwesomeIcon icon={faPhone} />
                </div>
                <span className="font-black text-xs uppercase tracking-tighter">{vendor.phone || "Private"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-sm">
                   <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span className="font-black text-xs uppercase tracking-tighter truncate w-40">{vendor.owner?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
