const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');
const matchRoutes = require('../routes/matchRoutes');
const chatRoutes = require('../routes/chatRoutes');
const reportRoutes = require('../routes/reportRoutes');
const { authMiddleware } = require('../middleware/auth');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/reports', reportRoutes);

// Export the configured app
module.exports = app;