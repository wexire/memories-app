import mongoose from "mongoose";
import postModel from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;

    const title = new RegExp(searchQuery, "i");

    const posts = await postModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;

    const newPost = await postModel.create({ ...post, creator: req.userId });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post found");

    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post found");

    await postModel.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post found");

    const post = await postModel.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
