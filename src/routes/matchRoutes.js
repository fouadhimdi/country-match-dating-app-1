const express = require('express');
const matchController = require('../controllers/matchController');
const { protect } = require('../middleware/auth');
const { validateMatch, runValidation } = require('../middleware/validation');

const router = express.Router();

// All match routes are protected
router.use(protect);

router.get('/country/:country', matchController.findMatchesByCountry);
router.post('/', validateMatch, runValidation, matchController.createMatch);
router.patch('/:matchId', matchController.updateMatchStatus);
router.get('/', matchController.getUserMatches);
router.get('/pending', matchController.getPendingMatches);

module.exports = router;