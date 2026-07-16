import api from './api';

/**
 * Fetch dashboard counters and recent query listing from backend API
 * @returns {Promise<Object>} The API response container
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
};
