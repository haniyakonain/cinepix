import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiMenu, BiSearch, BiX, BiLoader } from "react-icons/bi";
import { useSearch } from "../../context/Search.context";

const SECTION_LINKS = [
  { name: "Home", path: "home" },
  { name: "Movies", path: "movies" },
  { name: "Showtimes", path: "showtimes" },
  { name: "Book Tickets", path: "booking" },
  { name: "Reviews", path: "reviews" },
  { name: "About", path: "about" },
];
const SECTION_IDS = SECTION_LINKS.map((link) => link.path);

// Tracks which section is currently in view (home page only) so the nav
// can highlight it without relying on a hash that scrolling never sets.
const useActiveSection = () => {
  const location = useLocation();
  const [active, setActive] = useState(SECTION_IDS[0]);

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return active;
};

const MobileMenu = ({ isOpen, onClose, activeSection }) => (
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
            <SearchBar className="w-full" onNavigate={onClose} />
            <div className="flex flex-col gap-4">
              <NavLinks className="flex-col" onClose={onClose} activeSection={activeSection} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NavLinks = ({ className = "", onClose, activeSection }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    // Links live on every page, but the sections only exist on the home
    // page — navigate there first (carrying the target as a hash) instead
    // of silently doing nothing.
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      if (onClose) onClose();
      return;
    }

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
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {SECTION_LINKS.map((link) => (
        <motion.div key={link.name} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => scrollToSection(link.path)}
            className={`text-base font-medium transition-all duration-300 ${
              activeSection === link.path
                ? "text-red-500 font-bold"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            {link.name}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

// Search state lives in SearchContext (shared with the Home page hero) so
// typing here can swap what the hero shows without the two components
// needing a direct reference to each other.
const SearchBar = ({ className = "", onNavigate }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const { query, setQuery, results, isSearching, clearSearch } = useSearch();

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`flex items-center gap-3 bg-white/10 border border-white/15 px-3 py-2.5 rounded-xl shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ${className} ${
          isFocused ? "ring-2 ring-red-500 bg-white/15 border-white/25" : ""
        }`}
      >
        <BiSearch className={isFocused ? "text-red-500" : "text-gray-400"} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full min-w-0 bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-400"
          placeholder="Search for movies..."
        />
        {isSearching && <BiLoader className="animate-spin text-red-500" size={20} />}
      </motion.div>

      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-navy-900/95 backdrop-blur-md rounded-md shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {results.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                className="p-3 border-b border-navy-700/50 cursor-pointer"
                onClick={() => {
                  clearSearch();
                  navigate(`/movie/${movie.id}`);
                  if (onNavigate) onNavigate();
                }}
              >
                <div className="flex items-center gap-3">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-[72px] flex-shrink-0 object-cover rounded"
                    />
                  )}
                  <div className="min-w-0">
                    <h4 className="text-white font-medium truncate">{movie.title}</h4>
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
  const location = useLocation();
  const activeSection = useActiveSection();

  // rAF-throttled + passive so this doesn't run a state update on every
  // single scroll event while the page is being dragged/flung.
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links carry their target as a hash (e.g. /#reviews) when clicked from a
  // page other than home; once we land back on home, scroll to it. Retried
  // across a few frames since the section elements mount synchronously but
  // layout can still be settling right after navigation.
  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return undefined;

    const id = location.hash.slice(1);
    let attempts = 0;
    let frameId;

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 20) {
        attempts += 1;
        frameId = window.requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => frameId && window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`navbar fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-900/80 backdrop-blur border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/cinepix.png"
            alt="CinePix"
            className="h-12"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-6 min-w-0">
          <NavLinks activeSection={activeSection} />
        </div>
        <div className="hidden lg:block w-full max-w-xs min-w-0">
          <SearchBar />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-gray-200 hover:text-red-400 transition-all duration-300"
        >
          {isMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
        </motion.button>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </motion.nav>
  );
};

export default Navbar;