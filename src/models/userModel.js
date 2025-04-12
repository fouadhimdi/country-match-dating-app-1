const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: 18
    },
    gender: {
      type: String,
      required: [true, 'Please specify your gender'],
      enum: ['Male', 'Female', 'Other']
    },
    country: {
      type: String,
      required: [true, 'Please provide your country']
    },
    ethnicity: {
      type: String,
      required: [true, 'Please provide your ethnicity']
    },
    hobbies: {
      type: [String],
      required: [true, 'Please provide at least one hobby']
    },
    activities: {
      type: [String],
      required: [true, 'Please provide at least one activity']
    },
    blockedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    },
    matches: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    },
    profilePhoto: {
      type: String,
      default: 'default-profile.jpg'
    },
    bio: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if password is correct
userSchema.methods.checkPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if a user is blocked
userSchema.methods.isBlocked = function(userId) {
  return this.blockedUsers.includes(userId);
};

// Method to block a user
userSchema.methods.blockUser = function(userId) {
  if (!this.blockedUsers.includes(userId)) {
    this.blockedUsers.push(userId);
    return true;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;