import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiStar } from "react-icons/bi";

// Shown in place of the rotating HeroCarousel while a search is active, so
// the top of the page reflects the movie the visitor is actually looking
// for instead of an unrelated auto-playing slideshow.
const SearchResultHero = ({ query, topResult, isSearching }) => {
  const backdrop = topResult
    ? topResult.backdrop_path || topResult.poster_path
    : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={topResult ? topResult.id : isSearching ? "searching" : "empty"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-md bg-navy-800"
      >
        {backdrop ? (
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop}`}
            alt={topResult.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
          {topResult ? (
            <>
              <div className="flex items-center gap-2 text-yellow-500 text-sm mb-2">
                <BiStar />
                <span>{topResult.vote_average ? topResult.vote_average.toFixed(1) : "N/A"}</span>
                {topResult.release_date && (
                  <span className="text-gray-300">· {topResult.release_date.split("-")[0]}</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white max-w-2xl truncate">
                {topResult.title}
              </h2>
              <p className="hidden sm:block text-gray-300 text-sm md:text-base mt-2 max-w-xl line-clamp-2">
                {topResult.overview || "No overview available."}
              </p>
              <Link
                to={`/movie/${topResult.id}`}
                className="inline-block mt-4 w-fit bg-red-500 hover:bg-red-600 transition-colors text-white text-sm sm:text-base font-semibold px-4 sm:px-5 py-2 rounded-lg"
              >
                View Details
              </Link>
            </>
          ) : (
            <p className="text-gray-300 text-center sm:text-left">
              {isSearching ? "Searching..." : `No movies found for "${query}"`}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResultHero;
