const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile route
router.get('/profile/:userId', authMiddleware, getUserProfile);

// Update user profile route
router.put('/profile/:userId', authMiddleware, updateUserProfile);

module.exports = router;