import api from './api';

/**
 * Fetch filtered, searched, and paginated customer queries
 * @param {Object} params - The query filters, search term, and pagination parameters
 * @returns {Promise<Object>} The API response container
 */
export const getQueries = async (params = {}) => {
  try {
    const response = await api.get('/queries', { params });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a single customer query by ID
 * @param {string} id - The MongoDB ObjectId of the target query
 * @returns {Promise<Object>} The API response container containing the query object
 */
export const getQueryById = async (id) => {
  try {
    const response = await api.get(`/queries/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new customer support query
 * @param {Object} data - The query fields (customerName, customerEmail, subject, description, category, priority, status)
 * @returns {Promise<Object>} The API response containing the new query object
 */
export const createQuery = async (data) => {
  try {
    const response = await api.post('/queries', data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing customer query by ID
 * @param {string} id - The MongoDB ObjectId of the target query
 * @param {Object} data - The updated query fields
 * @returns {Promise<Object>} The API response containing the modified query object
 */
export const updateQuery = async (id, data) => {
  try {
    const response = await api.put(`/queries/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Soft delete a customer query by ID
 * @param {string} id - The MongoDB ObjectId of the target query
 * @returns {Promise<Object>} The API success message container
 */
export const deleteQuery = async (id) => {
  try {
    const response = await api.delete(`/queries/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
