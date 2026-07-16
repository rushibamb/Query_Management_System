import express from 'express';
import {
  getQueries,
  getQueryById,
  createQuery,
  updateQuery,
  deleteQuery
} from '../controllers/queryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getQueries)
  .post(createQuery);

router.route('/:id')
  .get(protect, getQueryById)
  .put(protect, updateQuery)
  .delete(protect, deleteQuery);

export default router;
