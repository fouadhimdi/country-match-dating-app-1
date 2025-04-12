// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\src\controllers\matchController.js
// Match Controller for handling match-related operations

const MatchModel = require('../models/matchModel');
const UserModel = require('../models/userModel');

// Function to find matches for a user
const findMatches = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matches = await MatchModel.findMatchesForUser(user);
        return res.status(200).json(matches);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding matches', error });
    }
};

// Function to update user preferences
const updatePreferences = async (req, res) => {
    const userId = req.params.userId;
    const { preferences } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.preferences = preferences;
        await user.save();
        return res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating preferences', error });
    }
};

// Exporting the functions
module.exports = {
    findMatches,
    updatePreferences,
};