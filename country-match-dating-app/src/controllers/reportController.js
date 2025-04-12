// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\src\controllers\reportController.js
// Report Controller for handling user reports and abuse management

const Report = require('../models/reportModel');

// Create a new report
exports.createReport = async (req, res) => {
    const { reporterId, offenderId, reason } = req.body;

    try {
        const report = new Report({
            reporterId,
            offenderId,
            reason,
            createdAt: new Date()
        });

        await report.save();
        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(500).json({ message: 'Error creating report', error });
    }
};

// Get all reports for a specific user
exports.getReportsForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const reports = await Report.find({ offenderId: userId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};

// Delete a report (admin functionality)
exports.deleteReport = async (req, res) => {
    const { reportId } = req.params;

    try {
        await Report.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
};