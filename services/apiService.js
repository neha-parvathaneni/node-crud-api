const api= require("../config/axiosConfig");
exports.getPosts=()=> api.get("/posts");
exports.getPostById=(id)=> api.get(`/posts/${id}`);
exports.createPost=(data)=> api.post("/posts", data);
exports.updatePost=(id, data)=> api.put(`/posts/${id}`, data);
exports.deletePost=(id)=> api.delete(`/posts/${id}`);