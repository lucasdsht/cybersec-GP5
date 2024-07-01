const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../services/post.services');

const router = express.Router();

router.post('/post', createPost);
router.get('/posts', getPosts);
router.get('/post/:id', getPostById);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

module.exports = router;


