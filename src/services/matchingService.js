const User = require('../models/userModel');
const Match = require('../models/matchModel');

/**
 * Calculate match score and common interests between two users
 * @param {Object} userA - First user object
 * @param {Object} userB - Second user object
 * @returns {Object} Match information with score and common interests
 */
const calculateMatch = (userA, userB) => {
  let matchScore = 0;
  const commonInterests = {
    ethnicity: false,
    hobbies: [],
    activities: []
  };
  
  // Check ethnicity match
  if (userA.ethnicity === userB.ethnicity) {
    matchScore++;
    commonInterests.ethnicity = true;
  }
  
  // Check hobbies match
  const commonHobbies = userA.hobbies.filter(hobby => 
    userB.hobbies.includes(hobby)
  );
  
  if (commonHobbies.length > 0) {
    matchScore++;
    commonInterests.hobbies = commonHobbies;
  }
  
  // Check activities match
  const commonActivities = userA.activities.filter(activity => 
    userB.activities.includes(activity)
  );
  
  if (commonActivities.length > 0) {
    matchScore++;
    commonInterests.activities = commonActivities;
  }
  
  return {
    matchScore,
    commonInterests
  };
};

/**
 * Find potential matches for a user in a specific country
 * @param {string} userId - ID of the user seeking matches
 * @param {string} country - Country to find matches in
 * @returns {Promise<Array>} Array of potential matches
 */
const findMatchesByCountry = async (userId, country) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) throw new Error('User not found');
  
  // Find users in the specified country who aren't blocked and haven't blocked the current user
  const potentialMatches = await User.find({
    _id: { $ne: userId },
    country,
    _id: { $nin: currentUser.blockedUsers },
    blockedUsers: { $ne: userId }
  });
  
  const matches = [];
  
  for (const potentialMatch of potentialMatches) {
    const matchInfo = calculateMatch(currentUser, potentialMatch);
    
    // Only consider matches with score of at least 3
    if (matchInfo.matchScore >= 3) {
      matches.push({
        user: potentialMatch,
        matchScore: matchInfo.matchScore,
        commonInterests: matchInfo.commonInterests
      });
    }
  }
  
  // Sort by match score, highest first
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Create a match record between two users
 * @param {string} userIdA - ID of the first user
 * @param {string} userIdB - ID of the second user
 * @returns {Promise<Object>} The created match object
 */
const createMatch = async (userIdA, userIdB) => {
  const userA = await User.findById(userIdA);
  const userB = await User.findById(userIdB);
  
  if (!userA || !userB) throw new Error('One or both users not found');
  if (userA.isBlocked(userIdB) || userB.isBlocked(userIdA)) {
    throw new Error('Cannot create match with blocked user');
  }
  
  const matchInfo = calculateMatch(userA, userB);
  
  // Only create match if score is at least 3
  if (matchInfo.matchScore < 3) {
    throw new Error('Insufficient match score');
  }
  
  // Sort user IDs to ensure consistent storage
  const userIds = [userIdA, userIdB].sort();
  
  // Create or update the match
  const match = await Match.findOneAndUpdate(
    { users: { $all: userIds } },
    { 
      users: userIds,
      matchScore: matchInfo.matchScore,
      commonInterests: matchInfo.commonInterests,
      status: 'pending'
    },
    { new: true, upsert: true }
  );
  
  return match;
};

module.exports = {
  calculateMatch,
  findMatchesByCountry,
  createMatch
};