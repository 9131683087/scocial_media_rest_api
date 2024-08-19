import dotenv from "dotenv";
import express from 'express';
import userRouter from './src/feature/users/user.routes.js'; // Adjust the path as necessary
import postRouter from "./src/feature/post/post.routes.js";
import commentRouter from "./src/feature/comment/comment.routes.js";
import likerouter from "./src/feature/like/like.routes.js";
import friendrouter from "./src/feature/friendship/firendship.routes.js";
// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use userRouter for /api/users routes
app.use('/api/users', userRouter);

app.use('/api/post', postRouter);

// Use commentRouter for /api/comments routes
app.use('/api/comments', commentRouter); // Ensure the path is correctly set

app.use('/api/like', likerouter);

app.use('/api/friends',friendrouter);

export default app;
