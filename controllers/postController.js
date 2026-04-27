const apiService= require("../services/apiService");
exports.getPosts= async (req, res) => {
    try {
        const response= await apiService.getPosts();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};
exports.getPost= async (req, res) => {
    try{
        const response= await apiService.getPostById(req.params.id);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
};
exports.createPost= async (req, res) => {
    try {
        const response= await apiService.createPost(req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
};
exports.updatePost= async (req, res) => {
    try {
        const response= await apiService.updatePost(req.params.id, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
};
exports.deletePost= async (req, res) => {
    try {
        await apiService.deletePost(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
};