import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent.");
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ... (keep header) */}
      <div className="bg-rose-50 py-16 px-4 border-b border-rose-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our services or need help planning your wedding? Our team is here for you 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          {/* ... (keep contact info) */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+880 1234 567 890</p>
                  <p className="text-gray-600">+880 9876 543 210</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email</h3>
                  <p className="text-gray-600">hello@weddingflow.com</p>
                  <p className="text-gray-600">support@weddingflow.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Office</h3>
                  <p className="text-gray-600">Level 4, Wedding Plaza, <br />Banani, Dhaka - 1213</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Sat - Thu: 09.00 AM - 08.00 PM</p>
                  <p className="text-gray-600">Friday: Emergency Support Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Tell us about your wedding plans..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-rose-600 text-white py-4 rounded-xl font-bold hover:bg-rose-700 transition shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
