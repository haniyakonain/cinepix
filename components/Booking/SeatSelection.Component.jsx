import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiPlay, BiExpand, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axios from 'axios';

const SeatSelection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&page=1`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        const limitedMovies = data.results.slice(0, 21);
        setMovies(limitedMovies);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  const enableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationEnabled(true);
          alert("Location enabled successfully!");
        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("Location access denied. Please enable location in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Location request timed out.");
              break;
            default:
              alert("An unknown error occurred while accessing location.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const findNearbyCinemas = (movieTitle) => {
    if (!locationEnabled) {
      alert("Please enable location first!");
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const searchQuery = encodeURIComponent(`cinemas near ${movieTitle}`);
          window.open(
            `https://www.google.com/maps/search/${searchQuery}/@${latitude},${longitude},15z`,
            '_blank'
          );
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white-500">
          Latest Movies in Theaters 
        </h2>
        <button
          onClick={enableLocation}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Enable Location
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            className="bg-navy-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {movie.title}
              </h3>
              <p className="text-gray-300 mb-4">
                Rating: {movie.vote_average.toFixed(1)}/10
              </p>
              <button
                onClick={() => findNearbyCinemas(movie.title)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Find Nearby Cinemas
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;