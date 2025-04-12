// Middleware for Authentication and Authorization

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable for secret key

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
        
        if (!token) {
            return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, secretKey);

        // Attach user to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
};