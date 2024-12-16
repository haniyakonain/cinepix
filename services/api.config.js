import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to add api_key to all requests
tmdbApi.interceptors.request.use((config) => {
  // Ensure api_key is only added in query parameters
  if (!config.params) {
    config.params = {};
  }
  config.params.api_key = process.env.REACT_APP_TMDB_TOKEN;
  return config;
}, (error) => {
  console.error('Request Error:', error.message || error);
  return Promise.reject(error);
});

// Add response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error?.response?.data?.status_message || error.message;
    console.error('API Error:', errorMsg);
    return Promise.reject(error);
  }
);

export const fetchMoviePosters = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie posters:', error?.message || error);
    return null;
  }
};

export const searchMovies = async (query, page = 1, language = 'en-US') => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: query,
        language: language,
        page: page,
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error?.message || error);
    return [];
  }
};

export default tmdbApi;
