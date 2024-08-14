import mongoose from 'mongoose';

// Define the Comment Schema for a Social Media Platform
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post model
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    commentText: {
        type: String,
        required: true,
        maxLength: [500, "Comment can't be greater than 500 characters"]
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User', // Reference to the User model for likes
        default: []
    }
}, { timestamps: true });

// Create and export the Comment model
const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
