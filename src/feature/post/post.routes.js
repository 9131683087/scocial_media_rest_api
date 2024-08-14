import express from "express";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// Create an instance of PostController
const postController = new PostController();

const postRouter = express.Router();

// Route to create a new post
postRouter.post("/", (req, res, next) => {
    postController.createPost(req, res, next);
});

// Route to get all posts for the news feed
postRouter.get('/all',jwtAuth,(req, res, next) => {
    postController.getAllPosts(req, res, next);
});

// Retrieve all posts for a specific user
postRouter.get('/:userId', (req, res, next) => {
    postController.getPostsByUser(req, res, next);
});

postRouter.get('/:postId', (req, res, next) => {
    postController.getPostById(req, res, next);
});

// Route to delete a specific post
postRouter.delete('/:postId', jwtAuth, (req, res, next) => { postController.deletePost(req, res, next);
});

// Update a specific post
postRouter.put('/:postId', jwtAuth, (req, res, next) => {
    postController.updatePost(req, res, next);
});


export default postRouter;
