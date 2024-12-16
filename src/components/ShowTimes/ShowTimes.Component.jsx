import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieShowtimes = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [movieTrailers, setMovieTrailers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [expandedCard, setExpandedCard] = useState(null);

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_TOKEN;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch now playing movies
                const moviesResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
                );
                const movies = moviesResponse.data.results.slice(0, 21);
                setNowPlayingMovies(movies);

                // Fetch trailers for each movie
                const trailerPromises = movies.map(async (movie) => {
                    try {
                        const trailerResponse = await axios.get(
                            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
                        );
                        // Find the first YouTube trailer
                        const youtubeTrailer = trailerResponse.data.results.find(
                            (video) => video.site === "YouTube" && video.type === "Trailer"
                        );
                        return {
                            [movie.id]: youtubeTrailer 
                                ? `https://www.youtube.com/embed/${youtubeTrailer.key}`
                                : null
                        };
                    } catch (error) {
                        console.error(`Error fetching trailer for movie ${movie.id}:`, error);
                        return { [movie.id]: null };
                    }
                });

                // Combine trailer results
                const trailerResults = await Promise.all(trailerPromises);
                const trailersMap = trailerResults.reduce((acc, trailer) => ({
                    ...acc,
                    ...trailer
                }), {});
                setMovieTrailers(trailersMap);

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
            <style>{`
                .movies-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    padding: 20px;
                }
                
                .movie-card {
                    width: 300px;
                    max-width: 350px;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }
                
                .movie-card:hover {
                    transform: scale(1.05);
                }
                
                .movie-card img {
                    width: 100%;
                    height: 450px;
                    object-fit: cover;
                }
                
                .movie-card h3 {
                    padding: 10px;
                    text-align: center;
                    font-size: 1.2rem;
                }
                
                .movie-details {
                    padding: 15px;
                }
                
                .movie-details button, 
                .movie-card > button {
                    width: 100%;
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                
                .movie-details button:hover, 
                .movie-card > button:hover {
                    background-color: #0056b3;
                }
                
                .trailer-video {
                    margin-top: 15px;
                }
                
                .loading, .no-movies {
                    width: 100%;
                    text-align: center;
                    padding: 20px;
                }
            `}</style>
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
                                    
                                    {/* Trailer Section */}
                                    {movieTrailers[movie.id] ? (
                                        <div className="trailer-video">
                                            <iframe
                                                width="100%"
                                                height="315"
                                                src={movieTrailers[movie.id]}
                                                title={`${movie.title} Trailer`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <p>No trailer available</p>
                                    )}

                                    <button
                                        onClick={() => handleCardToggle(null)}
                                        aria-label="Close movie details"
                                        className="close-details-btn"
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