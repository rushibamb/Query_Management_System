import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/**
 * Authentication check middleware protecting private API endpoints
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Verify Authorization Header existence and Bearer prefix
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  try {
    // 2. Verify JWT signature integrity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find matching active Admin (verifies decoded claims haven't been stale)
    const admin = await Admin.findById(decoded.adminId).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    // 4. Attach profile details to the Request context
    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email
    };

    next();
  } catch (error) {
    // Catch JWT expiration or signature validation errors
    res.status(401).json({
      success: false,
      message: 'Invalid authentication token.'
    });
  }
};
