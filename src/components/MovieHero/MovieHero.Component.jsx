import React from "react";
import { BiStar, BiTime } from "react-icons/bi";

// A banner for the specific movie being viewed — not a carousel of unrelated
// titles. (This used to fetch and display its own "now playing" slider,
// ignoring the `movie` prop entirely, so every movie page showed the same
// generic carousel instead of that movie's own poster/info.)
const MovieHero = ({ movie = {} }) => {
  const backdrop = movie.backdrop_path || movie.poster_path;
  const genres = movie.genres?.map(({ name }) => name).join(", ");

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[28rem] mt-20 overflow-hidden bg-navy-900">
      {backdrop && (
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop}`}
          alt={movie.title || movie.original_title || "Movie backdrop"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/20" />

      <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-4 pb-6 sm:pb-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white max-w-3xl">
          {movie.title || movie.original_title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm sm:text-base text-gray-200">
          {movie.vote_average > 0 && (
            <span className="flex items-center gap-1 text-yellow-500">
              <BiStar /> {movie.vote_average.toFixed(1)}
            </span>
          )}
          {movie.release_date && <span>{movie.release_date.split("-")[0]}</span>}
          {movie.runtime > 0 && (
            <span className="flex items-center gap-1">
              <BiTime /> {movie.runtime} min
            </span>
          )}
          {genres && <span className="truncate">{genres}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
