import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { BiX, BiStar } from "react-icons/bi";
import useInterval from "../../hooks/useInterval";
import LiveStatus from "../LiveStatus/LiveStatus.Component";

const REFRESH_INTERVAL_MS = 2 * 60 * 1000; // now-playing data is worth re-polling every couple minutes

const MovieShowtimes = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [movieTrailers, setMovieTrailers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [expandedMovie, setExpandedMovie] = useState(null);

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_TOKEN;
    const trailerCache = useRef({});

    const fetchMovies = useCallback(async ({ background = false } = {}) => {
        if (background) setIsRefreshing(true);
        try {
            const moviesResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
            );
            const movies = moviesResponse.data.results.slice(0, 21);
            setNowPlayingMovies(movies);

            // Only fetch trailers for movies we haven't already cached, so a
            // background refresh doesn't re-hit the API for the same 21 ids.
            const toFetch = movies.filter((movie) => !(movie.id in trailerCache.current));
            if (toFetch.length > 0) {
                const trailerResults = await Promise.all(
                    toFetch.map(async (movie) => {
                        try {
                            const trailerResponse = await axios.get(
                                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
                            );
                            const youtubeTrailer = trailerResponse.data.results.find(
                                (video) => video.site === "YouTube" && video.type === "Trailer"
                            );
                            return [movie.id, youtubeTrailer ? `https://www.youtube.com/embed/${youtubeTrailer.key}` : null];
                        } catch (error) {
                            console.error(`Error fetching trailer for movie ${movie.id}:`, error);
                            return [movie.id, null];
                        }
                    })
                );
                trailerResults.forEach(([id, url]) => {
                    trailerCache.current[id] = url;
                });
                setMovieTrailers({ ...trailerCache.current });
            }

            setLastUpdated(Date.now());
        } catch (error) {
            console.error("Error fetching now playing movies:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [TMDB_API_KEY]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // Keep the "now playing" list fresh in the background without
    // interrupting anything the visitor is doing.
    useInterval(() => fetchMovies({ background: true }), REFRESH_INTERVAL_MS);

    const expandedData = nowPlayingMovies.find((movie) => movie.id === expandedMovie);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <LiveStatus
                    lastUpdated={lastUpdated}
                    isRefreshing={isRefreshing}
                    onRefresh={() => fetchMovies({ background: true })}
                />
            </div>

            {isLoading ? (
                <div className="text-center text-gray-300 py-12">Loading showtimes...</div>
            ) : nowPlayingMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {nowPlayingMovies.map((movie) => (
                        <motion.button
                            type="button"
                            key={movie.id}
                            onClick={() => setExpandedMovie(movie.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="text-left bg-navy-800/60 rounded-lg overflow-hidden shadow-lg border border-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <div className="relative w-full aspect-[2/3] bg-navy-900">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "https://via.placeholder.com/500x750.png?text=No+Image"
                                    }
                                    alt={movie.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/500x750.png?text=No+Image";
                                    }}
                                />
                            </div>
                            <div className="p-2 sm:p-3">
                                <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                                    <BiStar />
                                    <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-300 py-12">
                    No movies available at the moment. Please check back later!
                </div>
            )}

            {createPortal(
                <AnimatePresence>
                    {expandedData && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
                            onClick={() => setExpandedMovie(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-navy-900 rounded-t-2xl sm:rounded-2xl border border-red-500/20 p-4 sm:p-6"
                            >
                                <button
                                    onClick={() => setExpandedMovie(null)}
                                    aria-label="Close movie details"
                                    className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
                                >
                                    <BiX size={26} />
                                </button>

                                <h3 className="text-xl sm:text-2xl font-bold text-white pr-8">{expandedData.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-300">
                                    <span className="flex items-center gap-1 text-yellow-500">
                                        <BiStar /> {expandedData.vote_average ? expandedData.vote_average.toFixed(1) : "N/A"}
                                    </span>
                                    <span>{expandedData.release_date || "Release date N/A"}</span>
                                </div>
                                <p className="text-gray-300 mt-4 leading-relaxed">
                                    {expandedData.overview || "No overview available."}
                                </p>

                                <div className="mt-4">
                                    {movieTrailers[expandedData.id] ? (
                                        <div className="aspect-video w-full">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={movieTrailers[expandedData.id]}
                                                title={`${expandedData.title} Trailer`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="rounded-lg"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm">No trailer available</p>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default MovieShowtimes;
