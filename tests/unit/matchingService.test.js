const MatchingService = require('../../src/services/matchingService');

describe('MatchingService', () => {
    let matchingService;

    beforeEach(() => {
        matchingService = new MatchingService();
    });

    test('should return true for a good match on three categories', () => {
        const user1 = {
            ethnicity: 'Asian',
            hobbies: ['reading', 'traveling', 'cooking'],
            activities: ['hiking', 'swimming']
        };
        const user2 = {
            ethnicity: 'Asian',
            hobbies: ['reading', 'gaming', 'cooking'],
            activities: ['hiking', 'dancing']
        };

        const result = matchingService.isGoodMatch(user1, user2);
        expect(result).toBe(true);
    });

    test('should return false for a bad match on less than three categories', () => {
        const user1 = {
            ethnicity: 'Hispanic',
            hobbies: ['reading', 'traveling'],
            activities: ['hiking']
        };
        const user2 = {
            ethnicity: 'Asian',
            hobbies: ['gaming', 'cooking'],
            activities: ['swimming']
        };

        const result = matchingService.isGoodMatch(user1, user2);
        expect(result).toBe(false);
    });

    test('should block a user', () => {
        const userId = 'user123';
        const blockedUserId = 'user456';

        matchingService.blockUser(userId, blockedUserId);
        const isBlocked = matchingService.isUserBlocked(userId, blockedUserId);
        expect(isBlocked).toBe(true);
    });

    test('should not block the same user twice', () => {
        const userId = 'user123';
        const blockedUserId = 'user456';

        matchingService.blockUser(userId, blockedUserId);
        matchingService.blockUser(userId, blockedUserId); // Attempt to block again
        const blockedUsers = matchingService.getBlockedUsers(userId);
        expect(blockedUsers.length).toBe(1);
    });
});