// controllers/FriendshipController.js
import FriendshipRepository from './friendship.respository.js';

class FriendshipController {

    //1.Send Request Api
  async toggleFriendship(req, res) {
    try {
      const { userId } = req.body;  
      const { friendId } = req.params;  

      // Check if a friendship already exists where userId is the receiver and friendId is the sender
      let friendship = await FriendshipRepository.findFriendship(userId, friendId);
      if (friendship) {
        if (friendship.status === 'accepted' || friendship.status === 'pending') {
          // If friendship exists and is accepted or pending, delete it (unfriend or cancel request)
          await FriendshipRepository.deleteFriendship(friendship._id);
          return res.status(200).json({ message: 'Friendship removed' });
        }
      } else {
        // Create a new friendship request
        friendship = await FriendshipRepository.createFriendship(userId, friendId);
        return res.status(201).json({ message: 'Friendship request sent', friendship });
      }

      // Return a default response
      res.status(400).json({ message: 'Unable to toggle friendship' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
// 2.response APPI 
  async respondToFriendRequest(req, res) {
    try {
      const { userId } = req.body;  // Extract userId (receiver) from the request body
      const { friendId } = req.params;  // Extract friendId (sender) from the request parameters
      const { status } = req.body;  // Extract status ('accepted' or 'rejected') from the request body

      // Validate status
      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. It should be either "accepted" or "rejected".' });
      }

      // Find the pending friend request
      let friendship = await FriendshipRepository.findPendingRequest(userId, friendId);
      if (!friendship) {
        return res.status(404).json({ message: 'Friend request not found or already responded to.' });
      }

      // Update the friendship status
      friendship = await FriendshipRepository.updateFriendshipStatus(friendship._id, status);
      return res.status(200).json({ message: `Friend request ${status}.`, friendship });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  //3.get friends 
  async getFriends(req, res) {
    try {
      const { userId } = req.params;  
      const friends = await FriendshipRepository.getFriends(userId);
      res.status(200).json({ friends });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
  //4. get Pending Request 
  async getPendingRequests(req, res) {
    try {
        const { userId } = req.body; // Get userId from request body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const pendingRequests = await FriendshipRepository.getPendingRequests(userId);
        return res.status(200).json(pendingRequests);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
}

export default new FriendshipController();


