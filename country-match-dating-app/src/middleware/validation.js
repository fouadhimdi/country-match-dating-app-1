// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\country-match-dating-app\src\middleware\validation.js
// Middleware for validating user input

const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('country').notEmpty().withMessage('Country is required'),
    body('ethnicity').notEmpty().withMessage('Ethnicity is required'),
    body('hobbies').isArray().withMessage('Hobbies must be an array'),
    body('activities').isArray().withMessage('Activities must be an array'),
];

const validateUserProfileUpdate = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('age').optional().isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('country').optional().notEmpty().withMessage('Country is required'),
    body('ethnicity').optional().notEmpty().withMessage('Ethnicity is required'),
    body('hobbies').optional().isArray().withMessage('Hobbies must be an array'),
    body('activities').optional().isArray().withMessage('Activities must be an array'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateUserProfileUpdate,
    handleValidationErrors,
};