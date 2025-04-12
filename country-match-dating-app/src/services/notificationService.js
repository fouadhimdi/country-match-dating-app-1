// Notification Service - Handles user notifications for matches and messages

class NotificationService {
    constructor() {
        this.notifications = []; // Store notifications
    }

    addNotification(userId, message) {
        const notification = {
            userId,
            message,
            timestamp: new Date()
        };
        this.notifications.push(notification);
        this.sendNotification(userId, message);
    }

    sendNotification(userId, message) {
        // Logic to send notification to the user (e.g., via email, push notification, etc.)
        console.log(`Notification sent to ${userId}: ${message}`);
    }

    getUserNotifications(userId) {
        return this.notifications.filter(notification => notification.userId === userId);
    }

    clearUserNotifications(userId) {
        this.notifications = this.notifications.filter(notification => notification.userId !== userId);
    }
}

module.exports = new NotificationService();