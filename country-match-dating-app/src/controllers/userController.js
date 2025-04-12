// User Controller for handling user-related operations

const UserProfile = require('../models/userModel'); // Assuming userModel exports a UserProfile class or schema

// Register a new user
const registerUser = async (req, res) => {
    const { name, age, gender, country, ethnicity, hobbies, activities } = req.body;
    try {
        const newUser = new UserProfile({ name, age, gender, country, ethnicity, hobbies, activities });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser.userId });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { userId } = req.body; // Assuming userId is used for login
    try {
        const user = await UserProfile.findById(userId); // Adjust based on your database logic
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Here you would typically check password and create a session or token
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error: error.message });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserProfile.findById(userId); // Adjust based on your database logic
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Exporting the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};