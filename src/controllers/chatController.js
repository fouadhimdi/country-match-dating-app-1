const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Match = require('../models/matchModel');

/**
 * Get user's chats
 */
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      participants: userId
    }).populate('participants', 'name profilePhoto')
      .sort({ lastActivity: -1 });

    res.status(200).json({
      status: 'success',
      results: chats.length,
      data: {
        chats
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Create a chat between matched users
 */
exports.createChat = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user._id;

    // Check if users are matched
    const match = await Match.findOne({
      users: { $all: [userId, targetUserId] },
      status: 'accepted'
    });

    if (!match) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot create chat without an accepted match'
      });
    }

    // Check if a chat already exists
    const existingChat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] }
    });

    if (existingChat) {
      return res.status(200).json({
        status: 'success',
        data: {
          chat: existingChat
        }
      });
    }

    // Create new chat
    const newChat = await Chat.create({
      participants: [userId, targetUserId],
      messages: []
    });

    // Populate participant details
    const populatedChat = await Chat.findById(newChat._id)
      .populate('participants', 'name profilePhoto');

    res.status(201).json({
      status: 'success',
      data: {
        chat: populatedChat
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Get messages from a specific chat
 */
exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    }).populate('participants', 'name profilePhoto')
      .populate('messages.sender', 'name profilePhoto');

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found or you are not a participant'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        chat
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Send a message in a chat
 */
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    // Find chat and ensure user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found or you are not a participant'
      });
    }

    // Check if any participant has blocked the other
    const participants = await User.find({
      _id: { $in: chat.participants }
    });

    const isBlocked = participants.some(participant => 
      participant.blockedUsers.includes(userId)
    );

    if (isBlocked) {
      return res.status(403).json({
        status: 'error',
        message: 'Cannot send message because you are blocked'
      });
    }

    // Add message to chat
    chat.messages.push({
      sender: userId,
      content,
      read: false
    });

    // Update last activity timestamp
    chat.lastActivity = Date.now();
    await chat.save();

    // Get the newly added message
    const newMessage = chat.messages[chat.messages.length - 1];

    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Mark messages as read
 */
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    // Find chat and ensure user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found or you are not a participant'
      });
    }

    // Get the other participant's ID
    const otherParticipantId = chat.participants.find(
      participantId => participantId.toString() !== userId.toString()
    );

    // Update all unread messages from the other participant
    let updated = false;
    
    chat.messages.forEach(message => {
      if (
        message.sender.toString() === otherParticipantId.toString() && 
        !message.read
      ) {
        message.read = true;
        updated = true;
      }
    });

    if (updated) {
      await chat.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Messages marked as read'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};