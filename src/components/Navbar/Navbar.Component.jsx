import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiMenu, BiSearch, BiX, BiLoader } from "react-icons/bi";
import { searchMovies } from "../../services/api.config";

const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-50 bg-navy-900/98 backdrop-blur-lg lg:hidden"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05, rotate: -5 }}
                src="/cinepix.png"
                alt="CinePix"
                className="h-16"
              />
            </Link>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-red-500 p-2 hover:text-red-400 transition-colors duration-300"
            >
              <BiX size={24} />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <SearchBar className="w-full" />
            <div className="flex flex-col gap-4">
              <NavLinks className="flex-col" onClose={onClose} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NavLinks = ({ className = "", onClose }) => {
  const location = useLocation();
  const links = [
    { name: "Home", path: "home" },
    { name: "Movies", path: "movies" },
    { name: "Showtimes", path: "showtimes" },
    { name: "Book Tickets", path: "booking" },
    { name: "Reviews", path: "reviews" },
    { name: "About", path: "about" },
  ];

  const scrollToSection = (sectionId) => {
    // Ensure the section exists before attempting to scroll
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`No element found with ID: ${sectionId}`);
      return;
    }

    // Calculate navbar height more robustly
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80; // Default to 80 if navbar not found

    // Use more precise scrolling calculation
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Close mobile menu if onClose is provided
    if (onClose) onClose();
  };

  return (
    <div className={`flex gap-6 ${className}`}>
      {links.map((link) => (
        <motion.div key={link.name} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => {
              // Ensure smooth scrolling works even if hash is not exactly matching
              scrollToSection(link.path);
            }}
            className={`text-base font-medium transition-all duration-300 ${
              location.hash === `#${link.path}` || window.location.hash === `#${link.path}`
                ? "text-red-500 font-bold"
                : "text-blue-400 hover:text-red-400"
            }`}
          >
            {link.name}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

// Rest of the code remains the same as in the original file (SearchBar and Navbar components)
const SearchBar = ({ className = "" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`flex items-center gap-3 bg-navy-900/50 px-3 py-2 rounded-md shadow-lg backdrop-blur-sm transition-all duration-300 ${className} ${
          isFocused ? "ring-2 ring-red-500 bg-navy-800/60" : ""
        }`}
      >
        <BiSearch className={isFocused ? "text-red-500" : "text-gray-400"} />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full bg-transparent border-none focus:outline-none text-blue-300 placeholder-gray-400"
          placeholder="Search for movies..."
        />
        {isLoading && <BiLoader className="animate-spin text-red-500" size={20} />}
      </motion.div>

      <AnimatePresence>
        {isFocused && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-navy-900/95 backdrop-blur-md rounded-md shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {searchResults.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                className="p-3 border-b border-navy-700/50 cursor-pointer"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <div className="flex items-center gap-3">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="text-blue-600 font-medium">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.release_date?.split("-")[0]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`navbar fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy-900/80 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/cinepix.png"
            alt="CinePix"
            className="h-12"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          <NavLinks />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-blue-400 hover:text-red-400 transition-all duration-300"
        >
          {isMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
        </motion.button>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;