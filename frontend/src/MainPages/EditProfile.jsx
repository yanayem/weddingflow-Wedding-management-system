import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { storage } from "../lib/firebase";
import { uploadImage } from "../lib/cloudinary";
import { deleteUser } from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser, userData, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
    profilePic: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        bio: userData.bio || "",
        profilePic: userData.profilePic || "",
        businessName: userData.businessName || "",
        serviceType: userData.serviceType || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setUploading(true);

    try {
      const url = await uploadImage(file);

      // Update locally and in DB immediately
      setForm(prev => ({ ...prev, profilePic: url }));
      await axios.put(`/api/users/${currentUser.uid}`, { ...form, profilePic: url });
      await refreshUserData();

      toast.success("Profile picture updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatePromise = axios.put(`/api/users/${currentUser.uid}`, form);

    toast.promise(updatePromise, {
      loading: "Updating profile...",
      success: "Profile updated successfully!",
      error: (err) => err.response?.data?.message || "Failed to update profile"
    });

    try {
      await updatePromise;
      if (refreshUserData) await refreshUserData();
      navigate("/profile");
    } catch (err) {
      // Handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you absolutely sure? This will permanently delete your account and all your data from our database. This action cannot be undone."
    );

    if (!confirmDelete) return;

    setLoading(true);

    const deletePromise = (async () => {
      // 1. Delete from MongoDB
      await axios.delete(`/api/users/${currentUser.uid}`);
      // 2. Delete from Firebase
      await deleteUser(currentUser);
    })();

    toast.promise(deletePromise, {
      loading: "Deleting account...",
      success: "Account deleted successfully.",
      error: (err) => {
        if (err.code === "auth/requires-recent-login") {
          return "For security, please logout and login again before deleting your account.";
        }
        return err.response?.data?.message || "Failed to delete account";
      }
    });

    try {
      await deletePromise;
      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div className="p-20 text-center font-bold text-rose-500">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-10 md:p-16 shadow-2xl border border-rose-50 w-full">
        <h2 className="text-3xl font-black text-gray-900 text-center uppercase tracking-tighter italic mb-12">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="w-32 h-32 border-4 border-rose-100 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
              {form.profilePic ? (
                <img src={form.profilePic} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-300 font-bold">{form.name?.charAt(0) || "U"}</span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-rose-50 text-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-rose-100 transition">
              {uploading ? "Uploading..." : "Change Photo"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Full Name</label>
            <input
              name="name"
              className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Phone Number</label>
              <input
                name="phone"
                className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Address</label>
              <input
                name="address"
                className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm"
                value={form.address}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
          </div>

          {userData?.role === 'vendor' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-rose-50/50 border border-rose-100">
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-rose-400 ml-1 tracking-widest">Business Name</label>
                  <input
                    name="businessName"
                    className="w-full p-4 bg-white border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Your Brand Name"
                  />
               </div>
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-rose-400 ml-1 tracking-widest">Service Type</label>
                  <select
                    name="serviceType"
                    className="w-full p-4 bg-white border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm text-gray-700"
                    value={form.serviceType}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {["Photography", "Caterers", "Makeup Artists", "Decorators", "Musicians / DJs", "Venues", "Invitations / Print", "Transport", "Wedding Planners"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
               </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Bio</label>
            <textarea
              name="bio"
              className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium text-sm"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-5 font-black uppercase tracking-widest text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-[2] bg-pink-500 hover:bg-pink-600 text-white py-5 font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-pink-500/20 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <h3 className="text-lg font-black text-rose-600 uppercase tracking-tighter italic mb-4">Danger Zone</h3>
          <div className="bg-rose-50 p-6 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-gray-900 uppercase">Delete Account</p>
              <p className="text-xs text-rose-400 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full md:w-auto bg-white border-2 border-rose-200 text-rose-600 px-8 py-3 font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 hover:text-white transition-all disabled:opacity-50"
            >
              Permanently Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
