import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Check if at least one Admin account has been registered
// @route   GET /api/auth/setup
// @access  Public
export const checkSetup = async (req, res) => {
  try {
    const admin = await Admin.findOne().select('_id');
    res.status(200).json({
      success: true,
      setupCompleted: !!admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check system setup status',
      error: error.message
    });
  }
};

// @desc    Register the first Administrator account
// @route   POST /api/auth/register
// @access  Public
export const registerAdmin = async (req, res) => {
  try {
    // 1. Lock down registration if an Admin already exists
    const adminExists = await Admin.findOne().select('_id');
    if (adminExists) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration has been disabled. Please login.'
      });
    }

    const { name, email, password, confirmPassword } = req.body;

    // 2. Validate input fields
    const errors = {};

    if (!name || !name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length > 60) {
      errors.name = 'Name cannot exceed 60 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // 3. Prevent duplicate email accounts (Conflict status)
    const existingAdmin = await Admin.findOne({ email: sanitizedEmail });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: 'An administrator with this email address already exists.'
      });
    }

    // 4. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create new Admin
    await Admin.create({
      name: name.trim(),
      email: sanitizedEmail,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Administrator account created successfully. Please login.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error encountered during registration process'
    });
  }
};

// @desc    Authenticate Administrator and generate JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate parameters
    const errors = {};
    if (!email || !email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // 2. Find Admin by Email
    const admin = await Admin.findOne({ email: sanitizedEmail });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 3. Compare password hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        name: admin.name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    // 5. Return success and payload
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error encountered during authentication process'
    });
  }
};
