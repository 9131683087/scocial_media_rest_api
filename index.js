import dotenv from "dotenv";
import express from 'express';
import userRouter from './src/feature/users/user.routes.js'; // Adjust the path as necessary
import postRouter from "./src/feature/post/post.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use userRouter for /api/users routes
app.use('/api/users', userRouter);

app.use('/api/post', postRouter);

export default app;
