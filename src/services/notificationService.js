/**
 * Service for handling notifications
 */

/**
 * Send a push notification
 * @param {string} userId - ID of the recipient user
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {Object} data - Additional data to include
 * @returns {Promise<Object>} Notification result
 */
exports.sendPushNotification = async (userId, title, body, data = {}) => {
  try {
    // In a real app, you would use a push notification service like Firebase
    // This is a simplified example
    console.log(`Sending push notification to user ${userId}: ${title} - ${body}`);
    
    // Mock result
    return {
      success: true,
      userId,
      title,
      body,
      data,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Failed to send push notification:', error);
    throw new Error('Failed to send notification');
  }
};

/**
 * Send a match notification
 * @param {string} userId - ID of the recipient user
 * @param {Object} matchedUser - User object of the matched user
 * @returns {Promise<Object>} Notification result
 */
exports.sendMatchNotification = async (userId, matchedUser) => {
  const title = 'تطابق جديد!';
  const body = `تهانينا! أنت و ${matchedUser.name} لديكما تطابق.`;
  const data = {
    type: 'match',
    matchedUserId: matchedUser._id.toString()
  };
  
  return exports.sendPushNotification(userId, title, body, data);
};

/**
 * Send a message notification
 * @param {string} userId - ID of the recipient user
 * @param {Object} sender - User object of the message sender
 * @param {string} messagePreview - Preview of the message
 * @returns {Promise<Object>} Notification result
 */
exports.sendMessageNotification = async (userId, sender, messagePreview) => {
  const title = `رسالة جديدة من ${sender.name}`;
  const body = messagePreview.length > 50 
    ? `${messagePreview.substring(0, 47)}...` 
    : messagePreview;
  const data = {
    type: 'message',
    senderId: sender._id.toString()
  };
  
  return exports.sendPushNotification(userId, title, body, data);
};

/**
 * Send a system notification
 * @param {string} userId - ID of the recipient user
 * @param {string} message - Notification message
 * @returns {Promise<Object>} Notification result
 */
exports.sendSystemNotification = async (userId, message) => {
  const title = 'إشعار من النظام';
  const body = message;
  const data = {
    type: 'system'
  };
  
  return exports.sendPushNotification(userId, title, body, data);
};