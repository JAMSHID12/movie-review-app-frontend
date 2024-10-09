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