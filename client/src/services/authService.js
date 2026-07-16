import api from './api';
import { clearAuth } from '../utils/authStorage';

/**
 * Check if the application has been initialized with at least one admin account
 * @returns {Promise<Object>} API response payload containing setupCompleted
 */
export const checkSetup = async () => {
  try {
    const response = await api.get('/auth/setup');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Authenticate administrator credentials
 * @param {Object} credentials - The email and password
 * @returns {Promise<Object>} API token response payload
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Register the system's first administrator account
 * @param {Object} adminData - The name, email, password, and confirmPassword
 * @returns {Promise<Object>} API success response payload
 */
export const register = async (adminData) => {
  try {
    const response = await api.post('/auth/register', adminData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Terminate user session and purge locally stored credentials
 */
export const logout = () => {
  clearAuth();
};
// Check file casing: client/src/services/authService.js
