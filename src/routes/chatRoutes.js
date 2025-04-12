const express = require('express');
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const { validateChat, validateMessage, runValidation } = require('../middleware/validation');

const router = express.Router();

// All chat routes are protected
router.use(protect);

router.get('/', chatController.getUserChats);
router.post('/', validateChat, runValidation, chatController.createChat);
router.get('/:chatId', chatController.getChatMessages);
router.post('/:chatId/messages', validateMessage, runValidation, chatController.sendMessage);
router.patch('/:chatId/messages/read', chatController.markMessagesAsRead);

module.exports = router;