import express from 'express';
import CommentController from './comment.controller.js'; 
import jwtAuth from '../../middlewares/jwt.middleware.js';
 

const commentRouter = express.Router();
const commentController = new CommentController();

// Add comment route without authentication middleware for testing
commentRouter.post('/:postId',jwtAuth, commentController.addComment);

// Get comments for a specific post
commentRouter.get('/:postId', commentController.getComments);

// Update a specific comment
commentRouter.put('/:commentId', commentController.updateComment);

// Delete comment route
commentRouter.delete('/:commentId',  commentController.deleteComment);




export default commentRouter;
