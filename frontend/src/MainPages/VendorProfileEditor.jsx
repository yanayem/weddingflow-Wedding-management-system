import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { storage } from "../lib/firebase";
import { uploadImage } from "../lib/cloudinary";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CATEGORY_MAP = {
  "Photography": ["Groom Photography", "Bride Photography", "Event Photography", "Drone Photography", "Pre-Wedding Shoot"],
  "Caterers": ["Buffet", "Desserts", "Drinks", "Custom Cakes", "Food Trucks"],
  "Makeup Artists": ["Bridal Makeup", "Family Makeup", "Groom Makeup", "Hair Styling"],
  "Decorators": ["Stage Decor", "Floral Decor", "Lighting", "Table Setup", "Theme Decor"],
  "Musicians / DJs": ["Live Bands", "DJ Services", "Solo Performers", "Classical Music"],
  "Venues": ["Banquet Halls", "Hotels", "Outdoor Gardens", "Beach Weddings"],
  "Invitations / Print": ["Wedding Cards", "Save the Date", "Thank You Cards", "Custom Printing"],
  "Transport": ["Luxury Cars", "Limousines", "Shuttle Services", "Vintage Cars"],
  "Wedding Planners": ["Full-Service Planner", "Day-of Coordinator", "Budget Planner", "Destination Planner"],
};

const VendorProfileEditor = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    category: "Photography",
    subcategories: [],
    description: "",
    address: "",
    phone: "",
    pricing: "",
    images: [],
  });

  useEffect(() => {
    const fetchVendorProfile = async () => {
      if (!currentUser || userData?.role !== "vendor") {
        setFetching(false);
        return;
      }
      try {
        const res = await axios.get(`/api/vendors/owner/${currentUser.uid}`);
        if (res.data) {
          setForm({
            businessName: res.data.businessName || "",
            category: res.data.category || "Photography",
            subcategories: res.data.subcategories || [],
            description: res.data.description || "",
            address: res.data.address || "",
            phone: res.data.phone || "",
            pricing: res.data.pricing || "",
            images: res.data.images || [],
          });
        }
      } catch (err) {
        console.error("Error fetching vendor profile", err);
      } finally {
        setFetching(false);
      }
    };
    if (userData) fetchVendorProfile();
  }, [currentUser, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setForm({
        ...form,
        category: value,
        subcategories: []
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubcategoryToggle = (sub) => {
    setForm(prev => {
      const exists = prev.subcategories.includes(sub);
      if (exists) {
        return { ...prev, subcategories: prev.subcategories.filter(s => s !== sub) };
      } else {
        return { ...prev, subcategories: [...prev.subcategories, sub] };
      }
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        if (file.size > 3 * 1024 * 1024) {
          toast.error(`${file.name} is too large (>3MB)`);
          continue;
        }
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      }
      setForm(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast.success(`${uploadedUrls.length} images uploaded!`);
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const savePromise = axios.post("/api/vendors", {
      uid: currentUser.uid,
      ...form,
    });

    toast.promise(savePromise, {
      loading: "Saving business profile...",
      success: "Business profile saved successfully!",
      error: (err) => err.response?.data?.message || "Failed to save profile"
    });

    try {
      await savePromise;
      navigate("/vendor-dashboard");
    } catch (err) {
      // Handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center font-bold text-rose-500">Loading Profile...</div>;
  if (userData?.role !== "vendor") return <div className="p-20 text-center font-black uppercase text-red-500">Access Denied.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-10 md:p-16 shadow-2xl border border-rose-50 w-full">
        <h2 className="text-3xl font-black text-gray-900 text-center uppercase tracking-tighter italic mb-12">
          Business Setup
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Business Name</label>
                <input name="businessName" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm" value={form.businessName} onChange={handleChange} placeholder="e.g. Eternal Moments Photography" required />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Category</label>
                <select name="category" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm text-gray-700" value={form.category} onChange={handleChange}>
                    {Object.keys(CATEGORY_MAP).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Sub-Categories (Select all that apply)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 border border-gray-100">
                  {CATEGORY_MAP[form.category]?.map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-pink-500"
                        checked={form.subcategories.includes(opt)}
                        onChange={() => handleSubcategoryToggle(opt)}
                      />
                      <span className="text-xs font-bold text-gray-600 group-hover:text-pink-500 transition-colors">{opt}</span>
                    </label>
                  ))}
              </div>
          </div>

          <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Description</label>
              <textarea name="description" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium text-sm" value={form.description} onChange={handleChange} rows={4} placeholder="Describe your services, experience, and what makes you unique..." required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Office Address</label>
                <input name="address" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm" value={form.address} onChange={handleChange} placeholder="123 Wedding Lane, Love City" required />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Phone Number</label>
                <input name="phone" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold text-sm" value={form.phone} onChange={handleChange} placeholder="+1 555 0123" required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Pricing (e.g. Starts from $500)</label>
              <input name="pricing" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 font-black text-pink-500 tracking-tighter italic" value={form.pricing} onChange={handleChange} placeholder="Starts from $1,200" required />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h6 className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Portfolio Gallery</h6>
                <label className="cursor-pointer bg-rose-50 text-rose-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition">
                   {uploading ? "Uploading..." : "Add Photos"}
                   <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {form.images.map((img, index) => (
                 <div key={index} className="aspect-square bg-gray-100 relative group border border-gray-200">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                 </div>
               ))}
               {form.images.length === 0 && !uploading && (
                 <div className="col-span-full py-10 border-2 border-dashed border-gray-100 text-center text-gray-300 text-xs font-bold uppercase tracking-widest">
                    No photos added yet
                 </div>
               )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-5 font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-pink-500/20 disabled:opacity-50 mt-6"
          >
            {loading ? "Saving Business Data..." : "Publish Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorProfileEditor;
