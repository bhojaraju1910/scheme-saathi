import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      profile: profile || {}
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error during registration.'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error during login.'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error.'
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.profile = { ...user.profile.toObject(), ...profile };
    await user.save();

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to update profile.'
    });
  }
};
