import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiStar } from "react-icons/bi";

const MAX_RESULTS = 12;

// Shown in place of the rotating HeroCarousel while a search is active — a
// plain grid of the matching movies' own posters and info, not another
// slider, so the visitor sees exactly what they searched for.
const SearchResultsGrid = ({ query, results, isSearching }) => {
  if (isSearching && results.length === 0) {
    return <div className="flex items-center justify-center h-40 text-gray-300">Searching...</div>;
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-300 text-center px-4">
        No movies found for "{query}"
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">
        {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {results.slice(0, MAX_RESULTS).map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="bg-navy-800/60 rounded-lg overflow-hidden border border-red-500/10"
            >
              <div className="relative w-full aspect-[2/3] bg-navy-900">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs text-center px-2">
                    No image
                  </div>
                )}
              </div>
              <div className="p-2">
                <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                  <BiStar />
                  <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                  {movie.release_date && (
                    <span className="text-gray-400">· {movie.release_date.split("-")[0]}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsGrid;
