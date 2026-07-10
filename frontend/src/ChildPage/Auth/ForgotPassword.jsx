import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-rose-50/50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">

        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
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
              Don't worry, we'll help you get back into your account.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col relative justify-center">
          {!submitted ? (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-500">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-gray-900"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-600 text-white py-4 rounded-none font-bold text-lg hover:bg-rose-700 active:scale-[0.98] transition-all shadow-lg shadow-rose-200 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center pt-4">
                  <Link to="/login" className="text-rose-600 font-bold hover:underline inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 animate-slideDown">
              <div className="bg-rose-50 w-20 h-20 rounded-none flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-rose-500" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">Check your email</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                We've sent a password reset link to <span className="font-bold text-gray-900">{email}</span>
              </p>
              <div className="pt-6">
                <Link to="/login" className="bg-rose-600 text-white px-8 py-3 rounded-none font-bold hover:bg-rose-700 transition-all shadow-lg inline-block">
                  Back to Login
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                Didn't receive the email? <button onClick={() => setSubmitted(false)} className="text-rose-600 font-bold hover:underline">Try again</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
