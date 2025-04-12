class Report {
    constructor(reporterId, offenderId, reason) {
        this.reporterId = reporterId; // ID of the user reporting
        this.offenderId = offenderId; // ID of the user being reported
        this.reason = reason; // Reason for the report
        this.timestamp = new Date(); // Time when the report was created
    }
}

module.exports = Report;