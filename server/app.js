import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import queryRoutes from './routes/queryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Standard middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(200).json({
    success: true,
    message: "Customer Query Management API Running",
    database: dbStatus
  });
});

// Register routes
app.use('/api/queries', queryRoutes);
app.use('/api/dashboard', protect, dashboardRoutes);
app.use('/api/auth', authRoutes);

// Centralized uncaught error handling middleware placeholder
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong on our end.'
  });
});

export default app;
