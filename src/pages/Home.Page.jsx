import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BiTime, BiMovie, BiStar } from "react-icons/bi";

// HOC
import DefaultlayoutHoc from "../layout/Default.layout";

// Components
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel.Component";
import SeatSelection from "../components/Booking/SeatSelection.Component";
import Reviews from "../components/Reviews/Reviews.Component";
import TrailerCard from "../components/Trailers/TrailerCard.Component";

// Add this import
import tmdbApi from '../services/api.config';

// Components
import ShowTimes from "../components/ShowTimes/ShowTimes.Component";

const styles = {
  gradientBg: "bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900",
  neonSection: "relative overflow-hidden border border-red-500/20 rounded-lg backdrop-blur-sm",
  neonGlow: "absolute inset-0 bg-red-500/10 blur-xl",
  sectionTitle: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500",
};

const HomePage = () => {
  const [recommendedMovies, setrecommendedMovies] = useState([]);
  const [premierMovies, setpremierMovies] = useState([]);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [trailerMovies, setTrailerMovies] = useState([]);

  useEffect(() => {
    const requestTopRatedMovies = async () => {
      try {
        const response = await tmdbApi.get("/movie/top_rated");
        setrecommendedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    requestTopRatedMovies();
  }, []);

  useEffect(() => {
    const requestPopularMovies = async () => {
      try {
        const response = await tmdbApi.get("/movie/popular");
        setpremierMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    requestPopularMovies();
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await tmdbApi.get("/movie/now_playing", {
          params: {
            region: 'IN',
            language: 'en-US'
          }
        });
        setNowShowingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };
    fetchNowPlaying();
  }, []);

useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await tmdbApi.get("/movie/upcoming", {
          params: {
            language: 'en-US',
            region: 'US'
          }
        });
        
        // Log response data to check for duplicates or issues
        console.log(response.data.results);

        // Transform API data to match your existing trailer card structure
        const transformedTrailers = response.data.results.slice(0, 12).map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: new Date(movie.release_date).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`,
          description: movie.overview
        }));

        // Log transformed trailers to ensure proper data
        console.log(transformedTrailers);

        // Filter duplicates based on movie ID
        const uniqueTrailers = Array.from(
          new Map(
            transformedTrailers.map((movie) => [movie.id, movie]) // Map movie ID to the movie object
          ).values()
        );

        setTrailerMovies(uniqueTrailers);
      } catch (error) {
        console.error("Error fetching upcoming movies for trailers:", error);
        // Fallback to static data if needed
        setTrailerMovies([]);
      }
    };

    fetchTrailers();
  }, []);

  return (
    <div className={styles.gradientBg}>
      {/* Hero Section */}
      <div id="home" className="relative w-full">
        <HeroCarousel />
      </div>

      {/* Movies Section */}
      <div id="movies" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8 mb-16`}
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
      <div id="showtimes" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8 mb-16`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiTime className="text-4xl text-red-500" />
              <h2 className={styles.sectionTitle}>Latest Showtimes</h2>
            </div>
            <p className="text-gray-300 mb-8">
              Real-time theatre showtimes and instant booking options
            </p>
            <div className="min-h-[500px]">
              <ShowTimes />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Section */}
      <div id="booking" className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <h2 className={styles.sectionTitle}>Book Tickets</h2>
            <SeatSelection 
              showtime={{ time: "20:00", date: "2024-02-20" }}
              onSeatSelect={(seats) => console.log('Selected seats:', seats)}
            />
          </div>
        </motion.div>
      </div>

      {/* Trailers Section */}
      <div id="trailers" className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8 mb-16`}
        >
          <div className={styles.neonGlow}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BiMovie className="text-3xl text-red-500" />
              <h2 className={styles.sectionTitle}>Latest Trailers</h2>
            </div>
            <p className="text-gray-300 mb-8">
              Watch the latest movie trailers and upcoming releases
            </p>

            {/* Display Unique Trailers */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
              {trailerMovies.map((movie) => (
                <TrailerCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8`}
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
      <div id="about" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${styles.neonSection} p-8 mb-16`}
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
                <div className="grid grid-cols-2 gap-4">
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
