// filepath: c:\Users\ftham\Desktop\YEGOLOZ\country-match-dating-app\src\controllers\chatController.js
// Chat Controller for managing chat functionalities

const ChatModel = require('../models/chatModel');

// Function to send a message
exports.sendMessage = async (req, res) => {
    const { chatId, senderId, message } = req.body;

    try {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        chat.messages.push({ senderId, message, timestamp: new Date() });
        await chat.save();

        return res.status(200).json({ message: 'Message sent successfully', chat });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending message', error });
    }
};

// Function to get messages from a chat
exports.getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.status(200).json({ messages: chat.messages });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// Function to create a new chat
exports.createChat = async (req, res) => {
    const { participants } = req.body;

    try {
        const newChat = new ChatModel({ participants, messages: [] });
        await newChat.save();

        return res.status(201).json({ message: 'Chat created successfully', chat: newChat });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating chat', error });
    }
};