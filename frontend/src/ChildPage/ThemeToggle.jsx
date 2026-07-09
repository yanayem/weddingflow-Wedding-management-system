import { Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={toggleTheme}
    className="fixed z-50 p-2 top-3 right-4 cursor-pointer">
      {isDarkMode ? (
        <Sun className="h-6 text-yellow-300 " />
      ) : (
        <Moon className="h-6 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
