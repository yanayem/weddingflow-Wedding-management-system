import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider } from "../../lib/firebase";
import { uploadImage } from "../../lib/cloudinary";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faHeart,
  faArrowRight,
  faEnvelope,
  faLock,
  faUser,
  faStore,
  faCogs,
  faCamera
} from "@fortawesome/free-solid-svg-icons";

const AuthPage = ({ initialRole = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUserData } = useAuth();

  const [role, setRole] = useState(initialRole);
  const isSignupPath = location.pathname.includes("signup") || location.search.includes("signup");
  const [isSignup, setIsSignup] = useState(isSignupPath);

  useEffect(() => {
    setIsSignup(location.pathname.includes("signup") || location.search.includes("signup"));
    setRole(initialRole);
  }, [location.pathname, location.search, initialRole]);

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (newRole === 'vendor') {
      navigate(isSignup ? "/vendor-auth?signup=true" : "/vendor-auth", { replace: true });
    } else {
      navigate(isSignup ? "/signup" : "/login", { replace: true });
    }
  };

  const toggleMode = () => {
    const nextMode = !isSignup;
    setIsSignup(nextMode);
    if (role === "vendor") {
      navigate(nextMode ? "/vendor-auth?signup=true" : "/vendor-auth", { replace: true });
    } else {
      navigate(nextMode ? "/signup" : "/login", { replace: true });
    }
  };

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    serviceType: "Photography",
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setProfilePic(url);
      toast.success("Image ready!");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginPromise = (async () => {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      const userData = await refreshUserData();

      navigate(userData?.role === "vendor" ? "/vendor-dashboard" : (userData?.role === "admin" ? "/admin" : "/profile"));
      return userData;
    })();

    toast.promise(loginPromise, {
      loading: "Signing in...",
      success: "Welcome back!",
      error: (err) => err.message || "Sign in failed"
    });

    try {
      await loginPromise;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    const registerPromise = (async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, regForm.email, regForm.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: regForm.name,
        photoURL: profilePic
      });

      const userData = {
        uid: user.uid,
        name: regForm.name,
        email: regForm.email,
        role: role,
        profilePic: profilePic,
        businessName: role === 'vendor' ? regForm.businessName : undefined,
        serviceType: role === 'vendor' ? regForm.serviceType : undefined,
      };

      await axios.post("/api/users/register", userData);
      await refreshUserData();

      navigate(role === "vendor" ? "/vendor-dashboard" : (role === "admin" ? "/admin" : "/profile"));
    })();

    toast.promise(registerPromise, {
      loading: "Creating account...",
      success: "Welcome to WeddingFlow!",
      error: (err) => err.message || "Registration failed"
    });

    try {
      await registerPromise;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleAuth = async () => {
    setLoading(true);

    const googlePromise = (async () => {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      let userData = await refreshUserData();

      if (!userData) {
        const newUser = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: role,
          profilePic: user.photoURL
        };
        const res = await axios.post("/api/users/register", newUser);
        userData = res.data;
        await refreshUserData();
      }

      navigate(userData?.role === "vendor" ? "/vendor-dashboard" : (userData?.role === "admin" ? "/admin" : "/profile"));
      return userData;
    })();

    toast.promise(googlePromise, {
      loading: "Connecting to Google...",
      success: "Authentication successful!",
      error: "Google Auth failed"
    });

    try {
      await googlePromise;
    } catch (error) {
      // Error handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const bgImage = role === 'vendor'
    ? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
    : "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-rose-50/50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px]">

        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src={bgImage}
            alt="Wedding"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="flex items-center gap-3 mb-4 self-start">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-none">
                <FontAwesomeIcon icon={faHeart} className="text-2xl text-rose-200" />
              </div>
              <h1 className="text-3xl font-serif font-bold tracking-tight">WeddingFlow</h1>
            </div>
            <p className="text-lg text-rose-50/90 max-w-md font-light leading-relaxed">
              {role === 'vendor'
                ? "Grow your wedding business and connect with couples looking for their perfect day."
                : "Your journey to the perfect wedding begins here. Plan, manage, and celebrate with ease."}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col relative">

          <div className="mb-10 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-rose-200">
              {role === 'vendor' ? 'Vendor Portal' : 'User Account'}
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              {isSignup ? (role === 'vendor' ? "Vendor Registration" : "Create Account") : "Welcome Back"}
            </h2>
            <p className="text-gray-500">
              {isSignup
                ? (role === 'vendor' ? "List your business and start growing." : "Join our community and start planning today.")
                : "Sign in to continue your wedding journey."}
            </p>
          </div>

          <div className="flex-1">
            {!isSignup ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-gray-900"
                      placeholder="name@example.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Link to="/forgot-password" size="sm" className="text-xs font-semibold text-rose-600 hover:text-rose-700">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? "text" : "password"} required
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-gray-900"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-600 text-white py-4 rounded-none font-bold text-lg hover:bg-rose-700 active:scale-[0.98] transition-all shadow-lg shadow-rose-200 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <FontAwesomeIcon icon={faArrowRight} className="ml-3" />}
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-4 animate-slideDown">

                {/* Profile Pic Upload during Reg */}
                <div className="flex justify-center mb-6">
                   <div className="relative group">
                      <div className="w-20 h-20 rounded-full border-2 border-rose-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                         {profilePic ? (
                           <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
                         ) : (
                           <FontAwesomeIcon icon={faUser} className="text-2xl text-gray-200" />
                         )}
                         {uploading && (
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                           </div>
                         )}
                      </div>
                      <label className="absolute -bottom-1 -right-1 bg-white text-rose-500 w-8 h-8 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-rose-500 hover:text-white transition-all border border-rose-50">
                         <FontAwesomeIcon icon={faCamera} className="text-xs" />
                         <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                      </label>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text" required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                      placeholder="mail@example.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                    />
                  </div>
                </div>

                {role === 'vendor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 ml-1">Business Name</label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faStore} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text" required
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                          placeholder="Your Business"
                          value={regForm.businessName}
                          onChange={(e) => setRegForm({...regForm, businessName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 ml-1">Service Type</label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faCogs} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all cursor-pointer appearance-none"
                          value={regForm.serviceType}
                          onChange={(e) => setRegForm({...regForm, serviceType: e.target.value})}
                        >
                          {["Photography", "Caterers", "Venues", "Makeup Artists", "Decorators", "Planners"].map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                    <input
                      type="password" required
                      autoComplete="new-password"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                      placeholder="••••••••"
                      value={regForm.password}
                      onChange={(e) => setRegForm({...regForm, password: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Confirm</label>
                    <input
                      type="password" required
                      autoComplete="new-password"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                      placeholder="••••••••"
                      value={regForm.confirmPassword}
                      onChange={(e) => setRegForm({...regForm, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-600 text-white py-4 rounded-none font-bold text-lg hover:bg-rose-700 active:scale-[0.98] transition-all shadow-lg shadow-rose-200 disabled:opacity-50 mt-2"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            )}

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              <div className="h-px flex-1 bg-gray-100"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full border-2 border-gray-100 py-3.5 rounded-none flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-50 hover:border-rose-100 transition-all active:scale-[0.98]"
            >
              <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-5 w-5" />
              Google Account
            </button>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-gray-500">
              {isSignup ? "Already have an account?" : "New to WeddingFlow?"}
              <button
                type="button"
                onClick={toggleMode}
                className="text-rose-600 font-bold ml-2 hover:underline"
              >
                {isSignup ? "Sign In" : (role === 'vendor' ? "Register Business" : "Join Now")}
              </button>
            </p>
          </div>

          {/* Role Switcher (Bottom) */}
          <div className="mt-8 p-4 bg-rose-50 rounded-none border border-rose-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                {role === 'vendor' ? "For Couples" : "For Vendors"}
              </span>
              <span className="text-sm font-semibold text-rose-900">
                {role === 'vendor' ? "Planning your wedding?" : "Are you a professional?"}
              </span>
            </div>
            <button
              onClick={() => handleRoleSwitch(role === 'vendor' ? 'user' : 'vendor')}
              className="bg-white text-rose-600 px-4 py-2 rounded-none text-xs font-bold shadow-sm hover:bg-rose-600 hover:text-white transition-all border border-rose-200"
            >
              Switch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
