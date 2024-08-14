import mongoose from "mongoose";
import PostModel from "./post.Schema.js";
import jwt from "jsonwebtoken";



export default class PostRepository {
    // 1.Create a new post
    async createPost(postData) {
        try {
            const newPost = new PostModel(postData);
            await newPost.save();
            return newPost;
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Error creating post");
        }
    }

    //2.Get all post 
    async getAllPosts() {
        try {
            const posts = await PostModel.find().populate('user', '-password').sort({ createdAt: -1 }); 
            return posts;
        } catch (err) {
            console.error('Database error:', err);
            throw new Error('Something went wrong with the database');
        }
    }
     //3. get post by id 
    async getPostById(postId) {
        try {
            const post = await PostModel.findById(postId).populate('user', 'name email');
            return post;
        } catch (err) {
            throw new Error("Database error: " + err.message);
        }
    }

    //4. Retrieve all posts for a specific user by their userId
    async getPostsByUserId(userId) {
        try {
            return await PostModel.find({ user: userId }).populate('user', 'name email'); 
        } catch (err) {
            throw new Error("Database error: Unable to retrieve posts for the user");
        }
    }

    // 5.Delete a specific post by ID
    async deletePostById(postId) {
        try {
            const deletedPost = await PostModel.findByIdAndDelete(postId);
            if (!deletedPost) {
                throw new Error('Post not found');
            }
            return deletedPost;
        } catch (err) {
            throw new Error(`Failed to delete post: ${err.message}`);
        }
    }

    //6. Update a specific post by ID
    async updatePost(postId, updateData) {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, { new: true });
            return updatedPost;
        } catch (err) {
            console.error('Database error details:', err);
            throw new Error('Something went wrong with the database');
        }
    }
}
