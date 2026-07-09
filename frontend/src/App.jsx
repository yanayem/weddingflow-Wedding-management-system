import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./MainPages/Home";
import LogIN from "./ChildPage/Auth/login";
import SignUp from "./ChildPage/Auth/SignUp";
import Vendor from "./MainPages/Vendor";
import WeddingPlanner from "./MainPages/WeddingPlanner";
import VendorList from "./MainPages/VendorList";
import Gallery from "./MainPages/Gallery";
import Events from "./MainPages/Events";
import AboutMe from "./ChildPage/AboutMe";
import ContactSection from "./ChildPage/ContactSection";
import Footer from "./ChildPage/Footer";
import NavBar from "./ChildPage/NavBar";
import VendorNavBar from "./ChildPage/VendorNavBar";
import ScrollToTop from "./ChildPage/ScrollToTop";
import Breadcrumb from "./ChildPage/Breadcrumb";
import Profile from "./MainPages/Profile";
import EditProfile from "./MainPages/EditProfile";
import VendorDetails from "./MainPages/VendorDetails";
import VendorProfileEditor from "./MainPages/VendorProfileEditor";
import VendorDashboard from "./MainPages/VendorDashboard";

import GroomPhotography from "./ChildPage/Vendor/Photography/GroomPhotography";
import BridePhotography from "./ChildPage/Vendor/Photography/BridePhotography";
import { useAuth } from "./context/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { userData } = useAuth();

  // Routes where we want to show the Vendor Navigation
  const vendorRoutes = ["/vendor-dashboard", "/vendor-profile-setup", "/edit-profile"];

  // If the user is a vendor and is on one of the vendor routes OR the profile (bookings) page
  const isVendorPath = vendorRoutes.includes(location.pathname) || (location.pathname === "/profile" && userData?.role === 'vendor');

  if (userData?.role === 'vendor' && isVendorPath) {
    return <VendorNavBar />;
  }

  return <NavBar />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Conditional Navbar */}
      <Navigation />

      {/* Page Wrapper */}
      <div className="min-h-screen flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIN />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/vendor-profile-setup" element={<VendorProfileEditor />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<ContactSection />} />

            {/* Vendor Main & Specific Sub-pages */}
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/vendor/details/:id" element={<VendorDetails />} />

            {/* Specific components for certain vendor types */}
            <Route path="/vendor/groom-photography" element={<GroomPhotography />} />
            <Route path="/vendor/bride-photography" element={<BridePhotography />} />

            {/* Specific components for Wedding Planners */}
            <Route path="/vendor/full-service-planner" element={<WeddingPlanner />} />
            <Route path="/vendor/day-of-coordinator" element={<WeddingPlanner />} />
            <Route path="/vendor/budget-planner" element={<WeddingPlanner />} />
            <Route path="/vendor/destination-planner" element={<WeddingPlanner />} />

            {/* Fallback for other Vendor categories */}
            <Route path="/vendor/:subcategory" element={<VendorList />} />

            {/* Event Pages */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:subcategory" element={<VendorList />} />

            {/* Catch-all dynamic route */}
            <Route path="/:category/:subcategory" element={<VendorList />} />
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
