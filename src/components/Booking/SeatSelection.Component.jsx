import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiTime } from 'react-icons/bi';
import useInterval from '../../hooks/useInterval';
import LiveStatus from '../LiveStatus/LiveStatus.Component';

const REFRESH_INTERVAL_MS = 3 * 60 * 1000;
const SHOWTIME_SLOTS = ['10:30', '13:45', '17:00', '20:15', '22:45'];
const NOW_SHOWING_WINDOW_MIN = 20; // treat a slot as "in progress" for this long after it starts

// Every movie gets a stable, evenly-offset daily schedule (derived from its
// id, not random) so the same movie always shows the same slots.
const scheduleFor = (movieId) => {
  const offset = movieId % SHOWTIME_SLOTS.length;
  return [...SHOWTIME_SLOTS.slice(offset), ...SHOWTIME_SLOTS.slice(0, offset)];
};

const nextShowtimeLabel = (movieId, now) => {
  const slots = scheduleFor(movieId);
  const todaysSlots = slots
    .map((time) => {
      const [h, m] = time.split(':').map(Number);
      const date = new Date(now);
      date.setHours(h, m, 0, 0);
      return { time, date };
    })
    .sort((a, b) => a.date - b.date);

  const inProgress = todaysSlots.find(({ date }) => {
    const minutesSinceStart = (now - date) / 60000;
    return minutesSinceStart >= 0 && minutesSinceStart <= NOW_SHOWING_WINDOW_MIN;
  });
  if (inProgress) return { text: `Now showing · ${inProgress.time}`, live: true };

  const upcoming = todaysSlots.find(({ date }) => date > now);
  const next = upcoming || { ...todaysSlots[0], date: new Date(todaysSlots[0].date.getTime() + 24 * 60 * 60 * 1000) };

  const diffMs = next.date - now;
  const diffMin = Math.round(diffMs / 60000);
  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;
  const countdown = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return { text: `Next show ${next.time} · in ${countdown}`, live: false };
};

const SeatSelection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const fetchLatestMovies = useCallback(async ({ background = false } = {}) => {
    try {
      if (background) setIsRefreshing(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 21));
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestMovies();
  }, [fetchLatestMovies]);

  // Refresh the now-playing list periodically, and re-derive showtime
  // countdowns every 30s so they visibly tick down without a full refetch.
  useInterval(() => fetchLatestMovies({ background: true }), REFRESH_INTERVAL_MS);
  useInterval(() => setNow(new Date()), 30 * 1000);

  const enableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
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
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 border-t-2 border-b-2 border-red-500"></div>
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
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Latest Movies in Theaters
          </h2>
          <LiveStatus
            lastUpdated={lastUpdated}
            isRefreshing={isRefreshing}
            onRefresh={() => fetchLatestMovies({ background: true })}
            label="Live schedule"
          />
        </div>
        <button
          onClick={enableLocation}
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Enable Location
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {movies.map((movie) => {
          const showtime = nextShowtimeLabel(movie.id, now);
          return (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.03 }}
              className="bg-navy-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative w-full aspect-[2/3]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate">
                  {movie.title}
                </h3>
                <p className="text-gray-300 mb-2 text-sm sm:text-base">
                  Rating: {movie.vote_average.toFixed(1)}/10
                </p>
                <div
                  className={`flex items-center gap-1.5 text-sm mb-4 ${
                    showtime.live ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  <BiTime className={showtime.live ? 'animate-pulse' : ''} />
                  <span>{showtime.text}</span>
                </div>
                <button
                  onClick={() => findNearbyCinemas(movie.title)}
                  className="mt-auto w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Find Nearby Cinemas
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatSelection;
