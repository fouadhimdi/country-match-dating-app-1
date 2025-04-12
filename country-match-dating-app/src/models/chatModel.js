class Chat {
    constructor(chatId, participants) {
        this.chatId = chatId; // Unique identifier for the chat
        this.participants = participants; // Array of user IDs participating in the chat
        this.messages = []; // Array to store messages in the chat
    }

    addMessage(senderId, content) {
        const message = {
            senderId,
            content,
            timestamp: new Date() // Timestamp of when the message was sent
        };
        this.messages.push(message);
    }

    getMessages() {
        return this.messages; // Return all messages in the chat
    }
}

module.exports = Chat;