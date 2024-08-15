import LikeModel from './like.Schema.js';
import PostModel from '../post/post.Schema.js';
import CommentModel from '../comment/comment.schema.js';

export default class LikeRepository {

    
    //1. Toggle like on a post or comment
    async toggleLike(userId, id) {
        let target;
        let type = 'post';

        // Check if the ID refers to a Post
        target = await PostModel.findById(id);
        
        // If not a post, check if it's a Comment
        if (!target) {
            target = await CommentModel.findById(id);
            type = 'comment';
        }

        if (!target) {
            throw new Error('Post or Comment not found');
        }

        // Check if the like already exists
        const existingLike = await LikeModel.findOne({
            [type]: id,
            user: userId
        });

        if (existingLike) {
            // If the like exists, remove it (unlike)
            await LikeModel.deleteOne({
                [type]: id,
                user: userId
            });
            return { liked: false };
        } else {
            // If the like doesn't exist, create a new one
            const newLike = new LikeModel({
                [type]: id,
                user: userId
            });
            await newLike.save();
            return { liked: true };
        }
    }

    // 2.Get likes for a specific post or comment
    async getLikes(id) {
        let target;
        let type = 'post';

        // Check if the ID refers to a Post
        target = await PostModel.findById(id);
        
        // If not a post, check if it's a Comment
        if (!target) {
            target = await CommentModel.findById(id);
            type = 'comment';
        }

        if (!target) {
            throw new Error('Post or Comment not found');
        }

        // Fetch likes for the specified post or comment
        const likes = await LikeModel.find({
            [type]: id
        }).populate('user', 'name email'); 
        return likes;
    }
}
