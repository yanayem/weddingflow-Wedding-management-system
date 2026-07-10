import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { refreshUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    businessName: "",
    serviceType: "Photography",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: form.role,
        businessName: form.role === 'vendor' ? form.businessName : undefined,
        serviceType: form.role === 'vendor' ? form.serviceType : undefined,
      };

      try {
        await axios.post("/api/users/register", userData);
        await refreshUserData();
        toast.success(`Account created with Google as ${form.role}!`);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          await refreshUserData();
          toast.success("Welcome back! Logging you in.");
        } else {
          throw err;
        }
      }
      navigate(form.role === "vendor" ? "/vendor-dashboard" : "/");
    } catch (error) {
      toast.error(error.message || "Google registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: form.name });

      const userData = {
        uid: user.uid,
        name: form.name,
        email: form.email,
        role: form.role,
        businessName: form.role === 'vendor' ? form.businessName : undefined,
        serviceType: form.role === 'vendor' ? form.serviceType : undefined,
      };

      await axios.post("http://localhost:5000/api/users/register", userData);
      await refreshUserData();

      toast.success(`Registration successful as ${form.role}!`);
      navigate(form.role === "vendor" ? "/vendor-dashboard" : "/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 py-12 px-4">
      <div className="bg-white p-10 shadow-2xl w-full max-w-lg border border-rose-100">
        <h2 className="text-3xl font-black text-gray-900 text-center uppercase tracking-tighter">Join WeddingFlow</h2>
        <p className="text-gray-500 text-center mb-8">Start your journey with us today.</p>

        {/* Role Tabs */}
        <div className="flex bg-gray-100 p-1 mb-8">
          <button
            onClick={() => setForm({...form, role: "user"})}
            className={`flex-1 py-3 text-xs font-bold uppercase transition-all ${form.role === "user" ? "bg-white text-pink-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            User
          </button>
          <button
            onClick={() => setForm({...form, role: "vendor"})}
            className={`flex-1 py-3 text-xs font-bold uppercase transition-all ${form.role === "vendor" ? "bg-white text-pink-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
              <input type="text" name="name" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email Address</label>
              <input type="email" name="email" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="name@mail.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          {form.role === "vendor" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideDown">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Business Name</label>
                <input type="text" name="businessName" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Dream Weddings" value={form.businessName} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
                <select name="serviceType" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold text-gray-700 text-sm" value={form.serviceType} onChange={handleChange}>
                  {["Photography", "Catering", "Venue", "Makeup", "Decoration", "Music/DJ", "Wedding Planner"].map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Password</label>
              <input type="password" name="password" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Confirm</label>
              <input type="password" name="confirmPassword" className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <div className="flex items-center gap-4 my-4">
            <hr className="flex-1 border-gray-100" />
            <span className="text-[10px] font-bold text-gray-300 uppercase">Or</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full border border-gray-200 py-3 flex items-center justify-center gap-3 font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-5 w-5" />
            Sign up with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Already have an account? <Link to="/login" className="text-pink-500 font-black hover:underline ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
