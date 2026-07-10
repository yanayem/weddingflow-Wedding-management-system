import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser, userData } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "users";

  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState(tabParam);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync activeTab with URL param
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats", {
        headers: { admin_uid: currentUser?.uid }
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async (resource) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/${resource}`, {
        headers: { admin_uid: currentUser?.uid }
      });
      setData(res.data);
    } catch (err) {
      toast.error("Failed to fetch " + resource);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`/api/admin/${activeTab}/${id}`, {
        headers: { admin_uid: currentUser?.uid }
      });
      toast.success("Deleted successfully");
      fetchData(activeTab);
      fetchStats();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (userData?.role === "admin") {
      fetchStats();
      fetchData(activeTab);
    }
  }, [userData, activeTab]);

  if (userData?.role !== "admin") {
    return <div className="p-20 text-center text-red-500 font-bold">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black uppercase italic mb-8 border-l-8 border-pink-500 pl-4">Database Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Users", count: stats?.users, color: "bg-blue-500" },
          { label: "Vendors", count: stats?.vendors, color: "bg-pink-500" },
          { label: "Bookings", count: stats?.bookings, color: "bg-purple-500" },
          { label: "Reviews", count: stats?.reviews, color: "bg-orange-500" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} p-6 text-white shadow-xl`}>
            <p className="text-xs font-bold uppercase opacity-80">{s.label}</p>
            <p className="text-3xl font-black">{s.count || 0}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {["users", "vendors", "bookings", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-3 font-bold uppercase text-xs tracking-widest transition-all ${
              activeTab === tab ? "border-b-4 border-pink-500 text-pink-500" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-[10px] font-black uppercase text-gray-400">ID / Name</th>
                <th className="p-4 text-[10px] font-black uppercase text-gray-400">Details</th>
                <th className="p-4 text-[10px] font-black uppercase text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="p-10 text-center font-bold animate-pulse">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="3" className="p-10 text-center font-bold text-gray-300">No records found</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-black text-sm text-gray-800">{item.name || item.businessName || item._id}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{item._id}</p>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-medium text-gray-600">
                        {activeTab === "users" && <p>{item.email} • {item.role}</p>}
                        {activeTab === "vendors" && <p>{item.category} • {item.owner?.email}</p>}
                        {activeTab === "bookings" && <p>{item.status} • ${item.totalPrice} • {new Date(item.eventDate).toLocaleDateString()}</p>}
                        {activeTab === "reviews" && <p>Rating: {item.rating} • {item.comment?.substring(0, 30)}...</p>}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-50 text-red-500 px-3 py-1 text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
