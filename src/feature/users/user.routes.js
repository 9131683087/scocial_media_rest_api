import express from 'express';
import UserController from '../users/user.controller.js';
//import jwtAuth from '../../middlewares/jwt.middleware.js';
import authMiddlware from '../../middlewares/jwt.middleware.js'
import jwtAuth from '../../middlewares/jwt.middleware.js';
// Create an instance of UserController
const userController = new UserController();

const userRouter = express.Router();

// Sign-up route
userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next);
});

// Sign-in route
userRouter.post('/signin', (req, res, next) => {
    userController.signIn(req, res, next);
});

// Logout route (requires authentication)
userRouter.post('/logout', jwtAuth, (req, res, next) => {
    userController.logout(req, res, next);
});

// Logout from all devices route (requires authentication)
userRouter.post('/logout-all-devices', jwtAuth, (req, res, next) => {
    userController.logoutAllDevices(req, res, next);
});

// Route to get user details by userId
userRouter.get('/get-details/:userId',jwtAuth, (req, res, next) => {
    userController.getUserDetails(req, res, next);
});


// Route to get all user details
userRouter.get('/get-all-details',(req, res, next) => {
    userController.getAllUserDetails(req, res, next);
});


// Update user details route
userRouter.put('/update-details/:userId', jwtAuth, (req, res, next) => {
    userController.updateDetails(req, res, next);
});

export default userRouter;
