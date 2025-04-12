// validators.js - Utility functions for input validation

function validateUserProfile(userProfile) {
    const { name, age, gender, country, ethnicity, hobbies, activities } = userProfile;

    if (typeof name !== 'string' || name.trim() === '') {
        return { valid: false, message: 'Name is required and must be a string.' };
    }

    if (typeof age !== 'number' || age < 18 || age > 120) {
        return { valid: false, message: 'Age must be a number between 18 and 120.' };
    }

    const validGenders = ['Male', 'Female', 'Other'];
    if (!validGenders.includes(gender)) {
        return { valid: false, message: 'Gender must be Male, Female, or Other.' };
    }

    if (typeof country !== 'string' || country.trim() === '') {
        return { valid: false, message: 'Country is required and must be a string.' };
    }

    if (typeof ethnicity !== 'string' || ethnicity.trim() === '') {
        return { valid: false, message: 'Ethnicity is required and must be a string.' };
    }

    if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
        return { valid: false, message: 'Hobbies must be an array of strings.' };
    }

    if (!Array.isArray(activities) || !activities.every(activity => typeof activity === 'string')) {
        return { valid: false, message: 'Activities must be an array of strings.' };
    }

    return { valid: true, message: 'User profile is valid.' };
}

function validateMatchCriteria(criteria) {
    const { ethnicity, hobbies, activities } = criteria;

    if (typeof ethnicity !== 'string' || ethnicity.trim() === '') {
        return { valid: false, message: 'Ethnicity is required and must be a string.' };
    }

    if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
        return { valid: false, message: 'Hobbies must be an array of strings.' };
    }

    if (!Array.isArray(activities) || !activities.every(activity => typeof activity === 'string')) {
        return { valid: false, message: 'Activities must be an array of strings.' };
    }

    return { valid: true, message: 'Match criteria are valid.' };
}

module.exports = {
    validateUserProfile,
    validateMatchCriteria
};