const express = require('express');
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const { validateReport, runValidation } = require('../middleware/validation');

const router = express.Router();

// All report routes are protected
router.use(protect);

router.post('/', validateReport, runValidation, reportController.createReport);
router.get('/', reportController.getUserReports);

// Admin routes (would need additional middleware to check admin role)
// router.get('/admin/all', reportController.getAllReports);
// router.patch('/admin/:reportId', reportController.updateReportStatus);

module.exports = router;