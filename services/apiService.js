const api = require("../config/axiosConfig");
const getPosts = () => api.get("/posts");
const getPostById = (id) => api.get(`/posts/${id}`);
const createPost = (data) => api.post("/posts", data);
const updatePost = (id, data) => api.put(`/posts/${id}`, data);
const deletePost = (id) => api.delete(`/posts/${id}`);
module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};