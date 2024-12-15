import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieShowtimes = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_TOKEN;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
                );
                setNowPlayingMovies(response.data.results.slice(0, 21)); // Fetch first 21 movies
            } catch (error) {
                console.error("Error fetching now playing movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [TMDB_API_KEY]);

    const handleCardToggle = (movieId) => {
        setExpandedCard(expandedCard === movieId ? null : movieId);
    };

    return (
        <div className="movie-showtimes-container">
            <header>
            </header>

            <section className="movies-list">
                {isLoading ? (
                    <div className="loading">
                        <span>Loading movies...</span>
                    </div>
                ) : nowPlayingMovies.length > 0 ? (
                    nowPlayingMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className={`movie-card ${
                                expandedCard === movie.id ? "expanded" : ""
                            }`}
                        >
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/500x750.png?text=No+Image"
                                }
                                alt={movie.title}
                                onError={(e) =>
                                    (e.target.src =
                                        "https://via.placeholder.com/500x750.png?text=No+Image")
                                }
                            />
                            <h3>{movie.title}</h3>
                            {expandedCard === movie.id ? (
                                <div className="movie-details">
                                    <p>{movie.overview || "No overview available."}</p>
                                    <p>Rating: {movie.vote_average || "N/A"}</p>
                                    <p>Release Date: {movie.release_date || "N/A"}</p>
                                    <button
                                        onClick={() => handleCardToggle(null)}
                                        aria-label="Close movie details"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleCardToggle(movie.id)}
                                    aria-label={`Show details for ${movie.title}`}
                                >
                                    Show Details
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-movies">
                        <p>No movies available at the moment. Please check back later!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MovieShowtimes;
