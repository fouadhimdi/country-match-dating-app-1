// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\src\models\userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
        default: []
    },
    activities: {
        type: [String],
        default: []
    },
    blockedUsers: {
        type: [String],
        default: []
    },
    matches: {
        type: [String],
        default: []
    }
});

// Method to block a user
userSchema.methods.blockUser = function(userId) {
    if (!this.blockedUsers.includes(userId)) {
        this.blockedUsers.push(userId);
        return true;
    }
    return false;
};

// Method to check if a user is blocked
userSchema.methods.isBlocked = function(userId) {
    return this.blockedUsers.includes(userId);
};

const User = mongoose.model('User', userSchema);

module.exports = User;