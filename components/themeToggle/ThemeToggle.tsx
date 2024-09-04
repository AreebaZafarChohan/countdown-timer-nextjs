// components/ThemeToggle.tsx
"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons

// ThemeToggle component to switch between light and dark mode
export default function ThemeToggle() {
  // State to keep track of the current theme mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Effect to initialize the theme based on local storage or system preference
  useEffect(() => {
    // Retrieve the saved theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to system preference if no saved theme
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Effect to apply the theme and save preference to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(prev => !prev)}
      className="icon p-2 pl-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center space-x-2"
    >
      {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      <span>{isDarkMode ? "" : ""}</span>
    </button>
  );
}