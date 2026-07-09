import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    const storageRef = ref(storage, `profiles/${currentUser.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm({ ...form, profilePic: url });
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/users/${currentUser.uid}`, form);
      toast.success("Profile updated successfully!");
      if (refreshUserData) await refreshUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
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
      </div>
    </div>
  );
};

export default EditProfile;
