// repositories/FriendshipRepository.js
import FriendshipModel from './friendship.schema.js';


class FriendshipRepository {
  //1.
  async findFriendship(userId, friendId) {
    return await FriendshipModel.findOne({
      user: userId,
      friend: friendId
    });
  }
  //2.
  async createFriendship(userId, friendId) {
    return await FriendshipModel.create({
      user: userId,
      friend: friendId,
      status: 'pending'
    });
  }
//3.
  async updateFriendshipStatus(friendshipId, status) {
    return await FriendshipModel.findByIdAndUpdate(friendshipId, { status }, { new: true });
  }

  //4.
  async deleteFriendship(friendshipId) {
    return await FriendshipModel.findByIdAndDelete(friendshipId);
  }

  //5.
   async findPendingRequest(userId, friendId) {
    return await FriendshipModel.findOne({
      user: userId, 
      friend: friendId,  
      status: 'pending'
    });
  }

  //6.
  async getFriends(userId) {
    try {
      // Find all friends where the user is either the sender or receiver with 'accepted' status
      const friendships = await FriendshipModel.find({
        $or: [
          { user: userId, status: 'accepted' },
          { friend: userId, status: 'accepted' }
        ]
      }).populate('user friend', 'name email'); // Populate user and friend fields with name and email

      // Map to get a list of friends
      return friendships.map(friendship => {
        if (friendship.user.toString() === userId) {
          return friendship.friend;
        } else {
          return friendship.user;
        }
      });
    } catch (error) {
      console.error('Error getting friends:', error);
      throw new Error('Unable to get friends.');
    }
  }

  //7.Get pending request 
  async getPendingRequests(userId) {
    try {
        const pendingRequests = await FriendshipModel.find({
            friend: userId,
            status: 'pending'
        }).populate('user', 'name email'); // Populate the user data

        return pendingRequests;
    } catch (error) {
        throw new Error('Error retrieving pending requests');
    }
}
}

export default new FriendshipRepository();

