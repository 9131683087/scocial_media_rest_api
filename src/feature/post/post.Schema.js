import mongoose from "mongoose";

// Define the Post Schema for a Social Media Platform
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Reference to the User model
    },
    title: {
        type: String,
        required: true,
        minLength: 4
    },
    caption: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: ''
    },
    url: {
        type: String, // Field to store a URL related to the post
        default: ''
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User", // Reference to the User model for likes
        default: []
    },
    liked: {
        type: Boolean,
        default: false
    },
    comments: {
        type: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model in comments
            comment: { type: String, required: true }
        }],
        default: []
    }
}, { timestamps: true });

// Create the Post model from the schema
const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
