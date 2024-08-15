import express from 'express';
import LikeController from './like.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const likerouter = express.Router();
const likeController = new LikeController();

// Route to toggle like on a post or comment
likerouter.post('/toggle/:id', jwtAuth,likeController.toggleLike);

// Route to get likes for a specific post or comment
likerouter.get('/:id', jwtAuth,likeController.getLikes);


export default likerouter;
