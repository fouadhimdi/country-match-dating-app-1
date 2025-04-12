// Match Model Class
class Match {
    constructor(userIdA, userIdB, matchScore) {
        this.userIdA = userIdA; // ID of the first user
        this.userIdB = userIdB; // ID of the second user
        this.matchScore = matchScore; // Score indicating the strength of the match
        this.createdAt = new Date(); // Timestamp of when the match was created
    }
}

// Export the Match model
module.exports = Match;