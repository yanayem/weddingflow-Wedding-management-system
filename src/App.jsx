import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./MainPages/Home";
import LogIN from "./ChildPage/Auth/login";
import SignUp from "./ChildPage/Auth/SignUp";
import Vendor from "./MainPages/Vendor";
import AboutMe from "./ChildPage/AboutMe";
import ContactSection from "./ChildPage/ContactSection";
import Footer from "./ChildPage/Footer";
import NavBar from "./ChildPage/NavBar";
import ScrollToTop from "./ChildPage/ScrollToTop";
import Breadcrumb from "./ChildPage/Breadcrumb";

import GroomPhotography from "./ChildPage/Vendor/Photography/GroomPhotography";

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Fixed Navbar */}
      <NavBar />

      {/* Page Wrapper */}
      <div className="min-h-screen">
        {/* pt-16 = navbar height */}

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIN />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/photography/groom" element={<GroomPhotography />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
