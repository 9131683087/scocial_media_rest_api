import express from 'express';
import friendshipController from './friendship.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


const friendrouter = express.Router();

friendrouter.post('/toggle-friendship/:friendId',jwtAuth,(req, res) => 
friendshipController.toggleFriendship(req, res));

friendrouter.post('/response-to-request/:friendId',(req, res) => 
friendshipController.respondToFriendRequest(req, res));


friendrouter.get('/get-friends/:userId',jwtAuth,(req, res) => 
friendshipController.getFriends(req, res));

friendrouter.get('/get-pending-requests',jwtAuth,(req, res) => 
friendshipController.getPendingRequests(req, res));







export default friendrouter;
