import CommentModel from './comment.schema.js'; 

export default class CommentRepository {

    // 1.Add a comment to a specific post
    async addCommentToPost(postId, userId, commentText) {
        try {
            // Create a new comment
            const newComment = new CommentModel({
                post: postId,
                user: userId,
                commentText: commentText
            });

            // Save the comment to the database
            const savedComment = await newComment.save();

            return savedComment;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // 2.Get comments for a specific post
    async getCommentsByPostId(postId) {
        try {
            // Find comments for the specified post
            const comments = await CommentModel.find({ post: postId }).populate('user', 'name'); // Populate user field to get user details
            return comments;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
    // 3.Update a specific comment by ID
    async updateCommentById(commentId, updateData) {
        try {
            // Find and update the comment
            const updatedComment = await CommentModel.findByIdAndUpdate(
                commentId,
                updateData,
                { new: true } // Return the updated document
            ).populate('user', 'name'); // Optionally populate the user field

            if (!updatedComment) {
                throw new Error('Comment not found');
            }

            return updatedComment;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // 4.Delete a specific comment by its ID
    async deleteCommentById(commentId) {
        try {
            const deletedComment = await CommentModel.findByIdAndDelete(commentId);
            return deletedComment;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}
