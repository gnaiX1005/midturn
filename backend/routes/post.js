import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { author, content } = req.body;
  const newPost = new Post({ author, content });
  await newPost.save();
  res.json(newPost);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

export default router;
