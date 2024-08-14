import PostRepository from "./post.respository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    // 1.Create a new post
    async createPost(req, res, next) {
        const { user, title, caption, photo, url } = req.body;

        try {
            // Prepare post data
            const postData = { user, title, caption, photo, url };

            // Save the post using the repository
            const newPost = await this.postRepository.createPost(postData);

            // Respond with the newly created post
            res.status(201).send(newPost);
        } catch (error) {
            next(error);
        }
    }

    // 2.Get all posts for the news feed
    async getAllPosts(req, res, next) {
        try {
            const posts = await this.postRepository.getAllPosts();
            res.status(200).send(posts);
        } catch (err) {
            next(err);
        }
    }

    //3.get post by id 
    async getPostById(req, res, next) {
        const { postId } = req.params;
        try {
            const post = await this.postRepository.getPostById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }

    // 4.Get all posts for a specific user
    async getPostsByUser(req, res, next) {
        const { userId } = req.params;
        try {
            const posts = await this.postRepository.getPostsByUserId(userId);
            res.status(200).json(posts);
        } catch (err) {
            next(err); 
        }
    }


     //5. Delete a specific post by ID
     async deletePost(req, res, next) {
        const { postId } = req.params;
        try {
            const deletedPost = await this.postRepository.deletePostById(postId);
            res.status(200).send({
                message: 'Post deleted successfully',
                post: deletedPost,
            });
        } catch (err) {
            res.status(404).send({ error: err.message });
        }
    }

     // 6.Update a specific post by ID
     async updatePost(req, res, next) {
        const { postId } = req.params;
        const updateData = req.body;

        try {
            const updatedPost = await this.postRepository.updatePost(postId, updateData);
            if (!updatedPost) {
                return res.status(404).send('Post not found');
            }
            res.status(200).json(updatedPost);
        } catch (err) {
            next(err);
        }
    }
}
