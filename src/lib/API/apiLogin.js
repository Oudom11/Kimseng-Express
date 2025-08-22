

import axios from 'axios';

// Base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Login API
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`https://su24.34.juicyjisu.us/api/login`, { email, password });

    // Save token if available
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const signupApi = async (formData) => {
  try {
    const response = await axios.post(`https://su24.34.juicyjisu.us/api/Register`, formData);

    // Save token if available
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data; // return user info or token
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};
