// models/Friendship.js
import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  friend: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

// Create a compound index on user and friend to ensure unique pairs
friendshipSchema.index({ user: 1, friend: 1 }, { unique: true });

const FriendshipModel = mongoose.model('Friendship', friendshipSchema);

export default FriendshipModel;
