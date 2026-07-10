import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./MainPages/Home";
import LoginSelection from "./ChildPage/Auth/LoginSelection";
import AuthPage from "./ChildPage/Auth/AuthPage";
import ForgotPassword from "./ChildPage/Auth/ForgotPassword";
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
import AdminNavBar from "./ChildPage/AdminNavBar";
import ScrollToTop from "./ChildPage/ScrollToTop";
import Breadcrumb from "./ChildPage/Breadcrumb";
import Profile from "./MainPages/Profile";
import EditProfile from "./MainPages/EditProfile";
import VendorDetails from "./MainPages/VendorDetails";
import VendorProfileEditor from "./MainPages/VendorProfileEditor";
import VendorDashboard from "./MainPages/VendorDashboard";
import AdminDashboard from "./MainPages/AdminDashboard";

import GroomPhotography from "./ChildPage/Vendor/Photography/GroomPhotography";
import BridePhotography from "./ChildPage/Vendor/Photography/BridePhotography";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <div className="p-20 text-center font-bold text-rose-500">Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (role && userData?.role !== role) return <Navigate to="/" />;

  return children;
};

const Navigation = () => {
  const { userData } = useAuth();

  // If the user is a vendor, show Vendor Navigation everywhere
  if (userData?.role === 'vendor') {
    return <VendorNavBar />;
  }

  // If the user is an admin, show Admin Navigation everywhere
  if (userData?.role === 'admin') {
    return <AdminNavBar />;
  }

  return <NavBar />;
};

const AuthRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-rose-500 border-t-transparent rounded-full"></div></div>;

  if (currentUser) {
    if (userData?.role === 'vendor') return <Navigate to="/vendor-dashboard" replace />;
    if (userData?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/profile" replace />;
  }

  return children;
};


const ConditionalFooter = () => {
  const location = useLocation();
  const authRoutes = ["/login", "/signup", "/vendor-auth", "/forgot-password"];

  if (authRoutes.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthRoute><AuthPage initialRole="user" /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><AuthPage initialRole="user" /></AuthRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/vendor-auth" element={<AuthRoute><AuthPage initialRole="vendor" /></AuthRoute>} />

            <Route path="/vendor" element={<Vendor />} />
            <Route path="/vendor/:category" element={<VendorList />} />
            <Route path="/vendor/:category/:subcategory" element={<VendorList />} />
            <Route path="/vendor-details/:id" element={<VendorDetails />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/wedding-planner" element={<WeddingPlanner />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<ContactSection />} />

            {/* Sub-category routes for Vendors */}
            <Route path="/vendor/groom-photography" element={<GroomPhotography />} />
            <Route path="/vendor/bride-photography" element={<BridePhotography />} />

            {/* Protected User Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

            {/* Protected Vendor Routes */}
            <Route path="/vendor-dashboard" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
            <Route path="/vendor-profile-setup" element={<ProtectedRoute role="vendor"><VendorProfileEditor /></ProtectedRoute>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;
