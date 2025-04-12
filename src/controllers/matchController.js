const Match = require('../models/matchModel');
const matchingService = require('../services/matchingService');

/**
 * Find potential matches in a specific country
 */
exports.findMatchesByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const userId = req.user._id;

    const matches = await matchingService.findMatchesByCountry(userId, country);

    res.status(200).json({
      status: 'success',
      results: matches.length,
      data: {
        matches
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Create a match between two users
 */
exports.createMatch = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user._id;

    const match = await matchingService.createMatch(userId, targetUserId);

    res.status(201).json({
      status: 'success',
      data: {
        match
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Update match status (accept/reject)
 */
exports.updateMatchStatus = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    // Check if status is valid
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be "accepted" or "rejected"'
      });
    }

    // Find match and ensure user is part of it
    const match = await Match.findOne({
      _id: matchId,
      users: userId
    });

    if (!match) {
      return res.status(404).json({
        status: 'error',
        message: 'Match not found or you are not part of this match'
      });
    }

    // Update status
    match.status = status;
    await match.save();

    res.status(200).json({
      status: 'success',
      data: {
        match
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Get user's matches
 */
exports.getUserMatches = async (req, res) => {
  try {
    const userId = req.user._id;

    const matches = await Match.find({
      users: userId,
      status: 'accepted'
    }).populate('users', 'name profilePhoto country');

    res.status(200).json({
      status: 'success',
      results: matches.length,
      data: {
        matches
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Get pending match requests
 */
exports.getPendingMatches = async (req, res) => {
  try {
    const userId = req.user._id;

    const pendingMatches = await Match.find({
      users: userId,
      status: 'pending'
    }).populate('users', 'name profilePhoto country');

    res.status(200).json({
      status: 'success',
      results: pendingMatches.length,
      data: {
        pendingMatches
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Block a user
 */
exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    
    // Update user's blocked list using user controller
    await matchingService.blockUser(currentUserId, userId);
    
    res.status(200).json({
      status: 'success',
      message: 'User blocked successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};