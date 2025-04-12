// src/services/matchingService.js
class MatchingService {
    static calculateMatch(userA, userB) {
        let matchCount = 0;

        // Check ethnicity match
        if (userA.ethnicity === userB.ethnicity) {
            matchCount++;
        }

        // Check hobbies match - at least one common hobby
        const commonHobbies = userA.hobbies.filter(hobby => userB.hobbies.includes(hobby));
        if (commonHobbies.length > 0) {
            matchCount++;
        }

        // Check activities match - at least one common activity
        const commonActivities = userA.activities.filter(activity => userB.activities.includes(activity));
        if (commonActivities.length > 0) {
            matchCount++;
        }

        // Return true if at least 3 categories match
        return matchCount >= 3;
    }

    static findMatches(currentUser, users) {
        return users.filter(user => 
            user.userId !== currentUser.userId && 
            !currentUser.isBlocked(user.userId) && 
            !user.isBlocked(currentUser.userId) && 
            this.calculateMatch(currentUser, user)
        );
    }
}

module.exports = MatchingService;