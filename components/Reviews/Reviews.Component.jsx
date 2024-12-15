import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BiStar, BiSolidStar } from 'react-icons/bi';
import axios from 'axios';

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.round(rating / 2) ? (
            <BiSolidStar className="text-yellow-500" />
          ) : (
            <BiStar className="text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch latest movies
        const moviesResponse = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
          params: {
            api_key: process.env.REACT_APP_TMDB_TOKEN,
            language: 'en-US',
            page: 1
          }
        });

        // Fetch reviews for latest movies
        const reviewPromises = moviesResponse.data.results.slice(0, 10).map(async (movie) => {
          try {
            const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/reviews`, {
              params: {
                api_key: process.env.REACT_APP_TMDB_TOKEN,
                language: 'en-US',
                page: 1
              }
            });

            return reviewsResponse.data.results.map((review) => ({
              id: review.id,
              movie: movie.title,
              moviePoster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              user: {
                name: review.author,
                avatar: review.author_details.avatar_path
                  ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                  : `https://ui-avatars.com/api/?name=${review.author}`,
                verified: review.author_details.username !== null
              },
              rating: review.author_details.rating || Math.floor(Math.random() * 5) + 1,
              date: review.created_at,
              comment: review.content
            }));
          } catch (reviewError) {
            console.error(`Error fetching reviews for movie ${movie.id}:`, reviewError);
            return [];
          }
        });

        const allReviews = (await Promise.all(reviewPromises)).flat()
          .filter((review) => review.comment && review.comment.trim() !== '')
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setReviews(allReviews);
        setLoading(false);
      } catch (fetchError) {
        console.error('Error fetching reviews:', fetchError);
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  // Memoized values for current reviews and total pages
  const totalPages = useMemo(() => Math.ceil(reviews.length / reviewsPerPage), [reviews.length, reviewsPerPage]);
  const currentReviews = useMemo(
    () => reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage),
    [currentPage, reviews, reviewsPerPage]
  );

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
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-navy-800/50 rounded-lg p-6 backdrop-blur-sm flex"
          >
            <img
              src={review.moviePoster}
              alt={review.movie}
              className="w-24 h-36 rounded-lg object-cover mr-4 hidden md:block"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${review.user.name}`;
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{review.user.name}</h3>
                    {review.user.verified && (
                      <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <h4 className="text-red-500 text-sm mt-1">
                    Review for: {review.movie}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating * 2} />
                    <span className="text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-300 leading-relaxed line-clamp-3">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Page Indicator */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {[...Array(totalPages)].map((_, index) => (
          <motion.button
            key={index}
            aria-label={`Go to page ${index + 1}`}
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
      </div>
    </div>
  );
};

export default Reviews;
