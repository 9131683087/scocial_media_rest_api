import LikeRepository from './like.respository.js';

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    // 1.Toggle like on a post or comment
    toggleLike = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body; // Get user ID from the request body

        try {
            // Call the repository function to toggle the like
            const result = await this.likeRepository.toggleLike(userId, id);

            res.status(200).json({
                success: true,
                message: result.liked ? 'Liked successfully' : 'Unliked successfully'
            });
        } catch (error) {
            next(error);
        }
    }

     //2. Get likes for a specific post or comment
     getLikes = async (req, res, next) => {
        const { id } = req.params;

        try {
            // Call the repository function to get likes
            const likes = await this.likeRepository.getLikes(id);

            res.status(200).json({
                success: true,
                likes: likes
            });
        } catch (error) {
            next(error);
        }
    }
    
}
