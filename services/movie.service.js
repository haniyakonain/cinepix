import axiosInstance from './axios.config';

export const requestTopRatedMovies = async () => {
  try {
    const response = await axiosInstance.get('/movie/top_rated');
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const requestPopularMovies = async () => {
  try {
    const response = await axiosInstance.get('/movie/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const requestUpcomingMovies = async () => {
  try {
    const response = await axiosInstance.get('/movie/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}; 