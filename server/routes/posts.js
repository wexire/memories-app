import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);

router.get("/", getPosts);
router.post("/", auth, createPost);

router.get("/:id", getPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
