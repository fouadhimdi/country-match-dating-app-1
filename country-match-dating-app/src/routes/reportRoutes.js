const express = require('express');
const { reportAbuse } = require('../controllers/reportController');

const router = express.Router();

// Route to report abuse
router.post('/report', reportAbuse);

module.exports = router;