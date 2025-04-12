// This file contains unit tests for the matching service, ensuring that the matching logic works correctly.

const { calculateMatch } = require('../../src/services/matchingService');
const UserProfile = require('../../src/models/userModel');

describe('Matching Service', () => {
    let userA, userB, userC;

    beforeEach(() => {
        userA = new UserProfile("user1", "Alice", 30, "Female", "USA", "Caucasian", ["reading", "hiking"], ["travel"]);
        userB = new UserProfile("user2", "Bob", 32, "Male", "USA", "Caucasian", ["reading", "cooking"], ["travel", "sports"]);
        userC = new UserProfile("user3", "Charlie", 28, "Male", "USA", "Hispanic", ["hiking", "gaming"], ["music"]);
    });

    test('should match users with the same ethnicity, hobby, and activity', () => {
        userA.ethnicity = userB.ethnicity; // Same ethnicity
        userA.hobbies.push("cooking"); // Common hobby
        userA.activities.push("travel"); // Common activity

        expect(calculateMatch(userA, userB)).toBe(true);
    });

    test('should not match users with less than 3 matching categories', () => {
        userA.ethnicity = userC.ethnicity; // Same ethnicity
        userA.hobbies.push("gaming"); // Common hobby

        expect(calculateMatch(userA, userC)).toBe(false);
    });

    test('should match users with 3 matching categories', () => {
        userA.ethnicity = userB.ethnicity; // Same ethnicity
        userA.hobbies.push("reading"); // Common hobby
        userA.activities.push("travel"); // Common activity

        expect(calculateMatch(userA, userB)).toBe(true);
    });

    test('should not match users with no common categories', () => {
        expect(calculateMatch(userA, userC)).toBe(false);
    });
});