const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin, runValidation } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, runValidation, userController.register);
router.post('/login', validateLogin, runValidation, userController.login);

// Protected routes
router.use(protect);

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);

router.post('/block/:userId', userController.blockUser);
router.delete('/block/:userId', userController.unblockUser);
router.get('/blocked', userController.getBlockedUsers);

module.exports = router;