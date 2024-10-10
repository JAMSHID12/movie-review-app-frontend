import axios from "axios";


const API_URL = 'http://localhost:8080';

// for registration
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const fetchReviewBasedOnReview = async () => {
  const response = await axios.get(`${API_URL}/movie/latest-movie-by-rating`);
  return response;
}

export const fetchLatestMovies = async () => {
  const response = await axios.get(`${API_URL}/movie/latest-movie-by-date`);
  return response;
}

export const fetchMoviesList = async (filters) => {
  try {
    const { genreId, languageId, releaseDate, minRating } = filters;
    const params = {
      ...(genreId && { genreId }),
      ...(languageId && { languageId }),
      ...(releaseDate && { releaseDate }),
      ...(minRating && { minRating }),
    };

    const response = await axios.get(`${API_URL}/filter`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${API_URL}/movie/search-movie`, {
    params: { query }
  });
  return response.data;
}

export const filterMovies = async ({
  genreId,
  languageId,
  releaseDate,
  minRating,
  page = 0,
  size = 12,
}) => {
  const params = {};

  if (genreId) params.genreId = genreId;
  if (languageId) params.languageId = languageId;
  if (releaseDate) params.releaseDate = releaseDate.toISOString().split('T')[0]; // Only pass if releaseDate exists
  if (minRating) params.minRating = minRating;
  params.page = page;
  params.size = size;

  const response = await axios.get(`${API_URL}/movie/filter`, { params });
  return response;
};

export const getAllGenreAndLanguage = async () => {
  const response = await axios.get(`${API_URL}/movie/genrs-language`);
  return response;
}