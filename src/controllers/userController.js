const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Generate JWT token for a user
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * Register a new user
 */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      country,
      ethnicity,
      hobbies,
      activities,
      bio
    } = req.body;

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      country,
      ethnicity,
      hobbies,
      activities,
      bio
    });

    // Generate token
    const token = signToken(newUser._id);

    // Remove password from output
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Login a user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Generate token
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Get current user profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    // Fields that are not allowed to be updated
    const restrictedFields = ['password', 'email'];
    
    // Filter out restricted fields
    const filteredBody = Object.keys(req.body)
      .filter(key => !restrictedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Block a user
 */
exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists
    const userToBlock = await User.findById(userId);
    if (!userToBlock) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update current user's blocked list
    const currentUser = req.user;
    const blocked = currentUser.blockUser(userId);
    
    if (!blocked) {
      return res.status(400).json({
        status: 'error',
        message: 'User is already blocked'
      });
    }

    await currentUser.save();

    res.status(200).json({
      status: 'success',
      message: 'User blocked successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Unblock a user
 */
exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Update current user's blocked list
    const currentUser = req.user;
    currentUser.blockedUsers = currentUser.blockedUsers.filter(
      id => id.toString() !== userId
    );
    
    await currentUser.save();

    res.status(200).json({
      status: 'success',
      message: 'User unblocked successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Get list of blocked users
 */
exports.getBlockedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('blockedUsers', 'name profilePhoto');

    res.status(200).json({
      status: 'success',
      data: {
        blockedUsers: user.blockedUsers
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};