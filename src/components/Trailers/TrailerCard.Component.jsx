import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiPlay, BiExpand, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axios from 'axios';

const TrailerCard = () => {
  const [trailerMovies, setTrailerMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_TMDB_TOKEN;

  // Fetch movie data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let allMovies = [];
        const seenMovieIds = new Set();  // To track added movies and avoid duplicates

        // Fetch multiple pages to get more movies
        for (let page = 1; page <= 5; page++) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
          );

          for (const movie of res.data.results) {
            // Skip if movie already added or lacks poster
            if (seenMovieIds.has(movie.id) || !movie.poster_path) continue;

            // Fetch movie trailers
            const trailerRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
            );

            const trailer = trailerRes.data.results.find(
              (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
            ) || trailerRes.data.results[0];

            if (trailer) {
              allMovies.push({
                ...movie,
                trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
              });
              seenMovieIds.add(movie.id);  // Mark this movie as added
            }

            // Break if we have enough movies
            if (allMovies.length >= 30) break;
          }

          // Break if we have enough movies
          if (allMovies.length >= 30) break;
        }

        // Sort movies by release date (newest first)
        allMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        // Set the unique movies array
        setTrailerMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Failed to fetch movie trailers');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const moviesPerPage = 9;
  const currentMovies = trailerMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  const totalPages = Math.ceil(trailerMovies.length / moviesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-white mb-4">Latest Trailers</h2>
      <p className="text-gray-400 mb-8">Watch the latest movie trailers and upcoming releases</p>

      {/* Movie Cards */}
      <div className="grid grid-cols-3 grid-rows-3 gap-6">
        {currentMovies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-navy-800/50 rounded-lg overflow-hidden"
          >
            <div className="relative aspect-video">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(movie.trailerUrl, '_blank')}
                  className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                >
                  <BiPlay size={32} />
                </motion.button>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(movie.trailerUrl, '_blank')}
                  className="text-red-500 hover:text-red-400"
                >
                  <BiExpand size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-gray-800 text-white p-2 rounded-lg disabled:opacity-50"
        >
          <BiChevronLeft size={24} />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(index)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index 
                ? 'bg-red-500 text-white' 
                : 'bg-navy-800 text-gray-400 hover:bg-red-500/20'
            } transition-colors`}
          >
            {index + 1}
          </motion.button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-800 text-white p-2 rounded-lg disabled:opacity-50"
        >
          <BiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default TrailerCard;
