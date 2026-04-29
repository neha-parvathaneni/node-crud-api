const apiService = require("../services/apiService");
const getPosts = async (req, res) => {
    try {
        const response = await apiService.getPosts();
        return res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error : "Failed to fetch posts" });
    }
};
const getPost = async (req, res) => {
    try{
        const response = await apiService.getPostById(req.params.id);
        return res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error : "Failed to fetch post" });
    }
};
const createPost = async (req, res) => {
    try {
        const response = await apiService.createPost(req.body);
        return res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error : "Failed to create post" });
    }
};
const updatePost = async (req, res) => {
    try {
        const response = await apiService.updatePost(req.params.id, req.body);
        return res.status(200).json(response.data);
    } catch(error) {
        res.status(500).json({ error : "Failed to update post" });
    }
};
const deletePost = async (req, res) => {
    try {
        await apiService.deletePost(req.params.id);
        res.json({ message : "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error : "Failed to delete post" });
    }
};
module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};