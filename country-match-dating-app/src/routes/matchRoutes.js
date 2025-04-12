// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\src\routes\matchRoutes.js
const express = require('express');
const { findMatches, reportMatch } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Route to find matches for a user
router.get('/:userId/matches', authMiddleware, findMatches);

// Route to report a match
router.post('/:userId/report', authMiddleware, reportMatch);

module.exports = router;