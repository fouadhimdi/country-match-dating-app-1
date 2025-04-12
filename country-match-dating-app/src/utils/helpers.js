// Utility functions for the dating app

/**
 * Generates a unique identifier for a user or resource.
 * @returns {string} A unique identifier.
 */
function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 16);
}

/**
 * Validates an email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Checks if a string is empty or contains only whitespace.
 * @param {string} str - The string to check.
 * @returns {boolean} True if empty or whitespace, false otherwise.
 */
function isEmptyOrWhitespace(str) {
    return !str || str.trim().length === 0;
}

/**
 * Formats a date to a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

module.exports = {
    generateUniqueId,
    isValidEmail,
    isEmptyOrWhitespace,
    formatDate
};