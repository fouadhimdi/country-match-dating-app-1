const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    matchScore: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    commonInterests: {
      ethnicity: { type: Boolean, default: false },
      hobbies: { type: [String], default: [] },
      activities: { type: [String], default: [] }
    }
  },
  {
    timestamps: true
  }
);

// Ensure that a match exists only once between two users
matchSchema.index({ users: 1 }, { unique: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;