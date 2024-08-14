import CommentRepository from './comment.respository.js'; 

export default class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    // 1.Add a comment to a specific post
    addComment = async (req, res, next) => {
        const { postId } = req.params;
        const { commentText, userId } = req.body; // Extract user ID from request body

        // Validate input
        if (!postId || !commentText || !userId) {
            return res.status(400).json({ 
                success: false,
                message: 'Post ID, comment text, and user ID are required' 
            });
        }

        try {
            // Call the repository function to add the comment
            const newComment = await this.commentRepository.addCommentToPost(postId, userId, commentText);
            
            res.status(201).json({
                success: true,
                message: "Comment added successfully",
                comment: newComment
            });
        } catch (error) {
            // Forward error to error handling middleware
            next(error);
        }
    }

    // 2.Get comments for a specific post
    getComments = async (req, res, next) => {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ 
                success: false,
                message: 'Post ID is required' 
            });
        }

        try {
            const comments = await this.commentRepository.getCommentsByPostId(postId);
            res.status(200).json({
                success: true,
                comments: comments
            });
        } catch (error) {
            next(error);
        }
    }

    // 3.Update a specific comment
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { commentText } = req.body; // You can add more fields as needed

        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: 'Comment ID is required'
            });
        }

        if (!commentText) {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        try {
            // Call the repository function to update the comment
            const updatedComment = await this.commentRepository.updateCommentById(commentId, { commentText });

            res.status(200).json({
                success: true,
                message: "Comment updated successfully",
                comment: updatedComment
            });
        } catch (error) {
            next(error);
        }
    }

    //4. Delete a specific comment
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;

        try {
            const deletedComment = await this.commentRepository.deleteCommentById(commentId);

            if (!deletedComment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Comment deleted successfully",
                comment: deletedComment
            });
        } catch (error) {
            next(error);
        }
    }
}
