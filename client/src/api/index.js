import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts"/${id}`);
export const likePost = (id) => API.patch(`/posts"/${id}/likePost`);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
