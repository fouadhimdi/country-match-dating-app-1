const Report = require('../models/reportModel');
const User = require('../models/userModel');

/**
 * Create a new report
 */
exports.createReport = async (req, res) => {
  try {
    const { offenderId, reason, details } = req.body;
    const reporterId = req.user._id;

    // Check if offender exists
    const offender = await User.findById(offenderId);
    if (!offender) {
      return res.status(404).json({
        status: 'error',
        message: 'User to report not found'
      });
    }

    // Create report
    const report = await Report.create({
      reporter: reporterId,
      offender: offenderId,
      reason,
      details,
      status: 'pending'
    });

    res.status(201).json({
      status: 'success',
      data: {
        report
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
 * Get reports made by the current user
 */
exports.getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({
      reporter: userId
    }).populate('offender', 'name profilePhoto');

    res.status(200).json({
      status: 'success',
      results: reports.length,
      data: {
        reports
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
 * Get all reports (admin only)
 */
exports.getAllReports = async (req, res) => {
  try {
    // Check if user is admin - this would require additional user roles
    // which would be implemented in a real-world scenario
    
    const reports = await Report.find()
      .populate('reporter', 'name profilePhoto')
      .populate('offender', 'name profilePhoto');

    res.status(200).json({
      status: 'success',
      results: reports.length,
      data: {
        reports
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
 * Update report status (admin only)
 */
exports.updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;
    
    // Check if status is valid
    if (!['pending', 'investigating', 'resolved', 'dismissed'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    // Update report
    const report = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({
        status: 'error',
        message: 'Report not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        report
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};