import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const TEAM = [
  { name: "Haniya Konain", linkedin: "https://www.linkedin.com/in/haniya-konain-210882251/" },
  { name: "Nadeeha Mapa Shoukat", linkedin: "https://www.linkedin.com/in/nadeeha-mapa-shoukat-9a834a175/" },
  { name: "Syeda Fatima", linkedin: "https://www.linkedin.com/in/fatima-syed-764b49249/" },
];

const QUICK_LINKS = [
  { name: "Home", path: "home" },
  { name: "Movies", path: "movies" },
  { name: "Showtimes", path: "showtimes" },
  { name: "Book Tickets", path: "booking" },
  { name: "Reviews", path: "reviews" },
];

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-navy-900 border-t border-red-500/10 text-gray-300 pt-12 pb-8 px-4 sm:px-6"
  >
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
          <img src="/cinepix.png" alt="CinePix" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-white">CinePix</span>
        </Link>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          Your destination for the latest movies, showtimes, and a seamless booking experience.
        </p>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {QUICK_LINKS.map((link) => (
            <li key={link.path}>
              <a href={`/#${link.path}`} className="hover:text-red-400 transition-colors">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/privacy-policy" className="hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service" className="hover:text-red-400 transition-colors">
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Built By</h4>
        <ul className="space-y-2 text-sm">
          {TEAM.map((member) => (
            <li key={member.name}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-400 transition-colors"
              >
                <FaLinkedin className="text-gray-500 flex-shrink-0" />
                <span className="truncate">{member.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="container mx-auto mt-10 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} CinePix. All Rights Reserved.
    </div>
  </motion.footer>
);

export default Footer;
