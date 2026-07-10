import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const VendorList = () => {
  const { category, subcategory } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const formatTitle = (str) => {
    if (!str) return "";
    return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const initialTitle = subcategory ? formatTitle(subcategory) : formatTitle(category);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      let url = `/api/vendors?category=${initialTitle}`;
      if (location) url += `&location=${location}`;
      if (searchTerm) url += `&search=${searchTerm}`;

      const res = await axios.get(url);
      setVendors(res.data);
    } catch (err) {
      console.error("Error fetching vendors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [initialTitle]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchVendors();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-rose-600 uppercase tracking-tighter italic">
            {initialTitle}
          </h2>
          <p className="text-gray-500 font-medium text-lg mt-2">
            Discover the most talented {initialTitle.toLowerCase()} for your wedding.
          </p>
        </div>

        <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-3xl shadow-lg border border-rose-50">
            <div className="w-40 relative">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300 text-xs" />
                <input
                    placeholder="Location"
                    className="w-full pl-8 pr-3 py-2 bg-rose-50 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-rose-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="w-40 relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300 text-xs" />
                <input
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-2 bg-rose-50 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-rose-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all" type="submit">
                <FontAwesomeIcon icon={faFilter} />
                Filter
            </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-rose-500"></div>
            <p className="font-black text-rose-500 uppercase tracking-widest text-xs animate-pulse">Finding best vendors...</p>
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
          <h4 className="text-xl font-black text-gray-400 uppercase tracking-tighter">No vendors found.</h4>
          <p className="text-gray-400 text-sm font-medium mt-2">Try adjusting your filters or search terms.</p>
          <div className="mt-8">
              <button className="text-pink-500 font-black uppercase tracking-widest text-[10px] hover:underline" onClick={() => {setLocation(""); setSearchTerm(""); fetchVendors();}}>
                Reset All Filters
              </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full">
              <div className="h-64 rounded-none relative overflow-hidden">
                <img
                  src={vendor.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-yellow-800 font-black text-xs">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-600" />
                    <span>{vendor.rating || "New"}</span>
                </div>
              </div>
              <div className="p-8 flex-1">
                <h3 className="text-2xl font-black text-gray-800 mb-2 truncate uppercase tracking-tighter">
                    {vendor.businessName}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mb-6 text-[10px] font-black uppercase tracking-widest">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-300" />
                  <span className="truncate">{vendor.address || "Area not specified"}</span>
                </div>
                <p className="text-gray-500 line-clamp-2 h-10 text-sm font-medium leading-relaxed">
                    {vendor.description}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-rose-50 p-8 pt-6">
                <div className="flex flex-col">
                    <span className="font-black uppercase text-[10px] tracking-widest text-gray-300">Starting at</span>
                    <span className="text-pink-500 font-black text-2xl tracking-tighter italic">{vendor.pricing || "TBD"}</span>
                </div>
                <Link to={`/vendor/details/${vendor._id}`}>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-pink-500/10">
                        View
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
