import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const LogIN = () => {
  const navigate = useNavigate();
  const { refreshUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userData = await refreshUserData();

      toast.success("Welcome back!");
      navigate(userData?.role === "vendor" ? "/vendor-dashboard" : "/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      let userData = await refreshUserData();

      if (!userData) {
        const newUser = { uid: user.uid, name: user.displayName, email: user.email, role: "user" };
        const axios = (await import("axios")).default;
        const res = await axios.post("/api/users/register", newUser);
        userData = res.data;
        await refreshUserData();
      }

      navigate(userData?.role === "vendor" ? "/vendor-dashboard" : "/");
    } catch (error) {
      toast.error("Google Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 p-4">
      <div className="bg-white p-10 shadow-2xl w-full max-w-md border border-rose-100">
        <h2 className="text-3xl font-black text-gray-900 text-center uppercase tracking-tighter">Login</h2>
        <p className="text-gray-500 text-center mb-8">Enter your details to sign in.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Email Address</label>
            <input
              type="email"
              className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-4 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-400 text-xs font-bold uppercase"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-gray-100" />
            <span className="text-[10px] font-bold text-gray-300 uppercase">Or</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-200 py-3 flex items-center justify-center gap-3 font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-5 w-5" />
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Don't have an account? <Link to="/signup" className="text-pink-500 font-black hover:underline ml-1">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LogIN;
