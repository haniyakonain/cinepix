import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BiTime, BiMovie, BiStar } from "react-icons/bi";

// HOC
import DefaultlayoutHoc from "../layout/Default.layout";

// Components
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel.Component";
import SearchResultHero from "../components/HeroCarousel/SearchResultHero.Component";
import SeatSelection from "../components/Booking/SeatSelection.Component";
import Reviews from "../components/Reviews/Reviews.Component";

// Add this import
import tmdbApi from '../services/api.config';

// Components
import ShowTimes from "../components/ShowTimes/ShowTimes.Component";
import useInterval from "../hooks/useInterval";
import { useSearch } from "../context/Search.context";

const MOVIES_REFRESH_INTERVAL_MS = 3 * 60 * 1000;

const styles = {
  gradientBg: "bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900",
  neonSection: "relative overflow-hidden border border-red-500/20 rounded-lg backdrop-blur-sm",
  neonGlow: "absolute inset-0 bg-red-500/10 blur-xl",
  sectionTitle: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500",
};

const HomePage = () => {
  const [recommendedMovies, setrecommendedMovies] = useState([]);
  const { query, topResult, isSearching } = useSearch();

  const requestTopRatedMovies = useCallback(async () => {
    try {
      const response = await tmdbApi.get("/movie/top_rated");
      setrecommendedMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  }, []);

  useEffect(() => {
    requestTopRatedMovies();
  }, [requestTopRatedMovies]);

  // Keep the trending list current without requiring a page reload.
  useInterval(requestTopRatedMovies, MOVIES_REFRESH_INTERVAL_MS);

  return (
    <div className={styles.gradientBg}>
      {/* Hero Section */}
      <div id="home" className="relative w-full">
        {query.trim() ? (
          <div className="mt-24 px-2 sm:px-4">
            <SearchResultHero query={query} topResult={topResult} isSearching={isSearching} />
          </div>
        ) : (
          <HeroCarousel />
        )}
      </div>

      {/* Movies Section */}
      <div id="movies" className="container mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-4 sm:p-6 md:p-8 mb-16`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiMovie className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>Now Playing</h2>
            </div>
            <PosterSlider
              posters={recommendedMovies}
              title="Trending Releases"
              subtitle="Popular movies to watch"
              isDark={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Showtimes Section */}
      <div id="showtimes" className="container mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-4 sm:p-6 md:p-8 mb-16`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiTime className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>Latest Showtimes and Trailers</h2>
            </div>
            <p className="text-gray-300 mb-8">
              Real-time theatre showtimes and its trailer's
            </p>
            <div className="min-h-[500px]">
              <ShowTimes />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Section */}
      <div id="booking" className="container mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-4 sm:p-6 md:p-8`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiStar className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>Book Tickets
              </h2>
            </div>
            <SeatSelection 
              showtime={{ time: "20:00", date: "2024-02-20" }}
              onSeatSelect={(seats) => console.log('Selected seats:', seats)}
            />
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="container mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-4 sm:p-6 md:p-8`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiStar className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>User Reviews</h2>
            </div>
            <p className="text-gray-300 mb-8">
              Read authentic audience reviews before booking
            </p>
            <Reviews />
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-4 sm:p-6 md:p-8 mb-16`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiMovie className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>About CinePix</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Your Ultimate Movie Experience
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  CinePix is your premier destination for all things cinema. We bring you the latest movies, 
                  exclusive events, and a seamless booking experience. Our platform offers:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Latest Hollywood, Bollywood, and Regional releases
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Instant ticket booking with seat selection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Exclusive movie premieres and events
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Real user reviews and ratings
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Our Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-navy-800/50 rounded-lg"
                  >
                    <h4 className="text-red-500 font-semibold mb-2">Easy Booking</h4>
                    <p className="text-gray-300 text-sm">
                      Book your tickets in just a few clicks with our intuitive interface
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-navy-800/50 rounded-lg"
                  >
                    <h4 className="text-red-500 font-semibold mb-2">Latest Trailers</h4>
                    <p className="text-gray-300 text-sm">
                      Watch HD trailers of upcoming releases
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-navy-800/50 rounded-lg"
                  >
                    <h4 className="text-red-500 font-semibold mb-2">User Reviews</h4>
                    <p className="text-gray-300 text-sm">
                      Get insights from other moviegoers before making your decision
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-navy-800/50 rounded-lg"
                  >
                    <h4 className="text-red-500 font-semibold mb-2">Live Showtimes</h4>
                    <p className="text-gray-300 text-sm">
                      Check real-time showtimes and booking availability
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DefaultlayoutHoc(HomePage);
