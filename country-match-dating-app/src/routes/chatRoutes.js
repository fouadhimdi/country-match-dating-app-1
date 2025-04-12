const express = require('express');
const chatController = require('../controllers/chatController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Route to send a message
router.post('/send', authMiddleware, chatController.sendMessage);

// Route to get chat history
router.get('/:userId', authMiddleware, chatController.getChatHistory);

// Route to delete a message
router.delete('/delete/:messageId', authMiddleware, chatController.deleteMessage);

module.exports = router;