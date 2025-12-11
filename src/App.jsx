import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./MainPages/Home";
import LogIN from "./ChildPage/Auth/login";
import SignUp from "./ChildPage/Auth/SignUp";
import Vendor from "./MainPages/Vendor"; // <-- fixed
import AboutMe from "./ChildPage/AboutMe";
import ContactSection from "./ChildPage/ContactSection";
import Footer from "./ChildPage/Footer";
import NavBar from "./ChildPage/NavBar";
import ScrollToTop from "./ChildPage/ScrollToTop";
import ThemeToggle from "./ChildPage/ThemeToggle";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
    {/*  <ThemeToggle /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIN />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
