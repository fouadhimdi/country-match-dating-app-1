const { body, validationResult } = require('express-validator');

/**
 * Collection of custom validators for the application
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result and message
 */
exports.validatePasswordStrength = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      message: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
    };
  }
  
  // Check for a mix of letters and numbers
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      message: 'يجب أن تحتوي كلمة المرور على حروف وأرقام'
    };
  }
  
  return {
    isValid: true,
    message: 'كلمة المرور قوية'
  };
};

/**
 * Validate age is at least 18
 * @param {number} age - Age to validate
 * @returns {boolean} Whether age is valid
 */
exports.isAdult = (age) => {
  return age >= 18;
};

/**
 * Validate array has minimum length
 * @param {Array} arr - Array to validate
 * @param {number} minLength - Minimum length required
 * @returns {boolean} Whether array meets minimum length
 */
exports.arrayHasMinLength = (arr, minLength) => {
  return Array.isArray(arr) && arr.length >= minLength;
};

/**
 * Validate string is not empty or just whitespace
 * @param {string} str - String to validate
 * @returns {boolean} Whether string is not empty
 */
exports.isNotEmpty = (str) => {
  return str && str.trim().length > 0;
};

/**
 * Validate image file type
 * @param {string} filename - Image filename
 * @returns {boolean} Whether file is a valid image
 */
exports.isValidImageFile = (filename) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return allowedExtensions.includes(extension);
};

/**
 * Validate file size is under limit
 * @param {number} fileSize - File size in bytes
 * @param {number} maxSizeInMB - Maximum size in MB
 * @returns {boolean} Whether file size is valid
 */
exports.isValidFileSize = (fileSize, maxSizeInMB = 5) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
};

const validateUserRegistration = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateMatchPreferences = [
    body('ethnicity').optional().isString().withMessage('Ethnicity must be a string'),
    body('hobbies').optional().isArray().withMessage('Hobbies must be an array'),
    body('activities').optional().isArray().withMessage('Activities must be an array'),
];

const validateReport = [
    body('userId').isString().notEmpty().withMessage('User ID is required'),
    body('reason').isString().notEmpty().withMessage('Reason for reporting is required'),
];

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateMatchPreferences,
    validateReport,
    validateInput,
};