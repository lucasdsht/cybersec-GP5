const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await client.post.create({
    data: {
      title,
      content,
      authorId
    }
  });

  return res.status(201).json(post);
}

const getPosts = async (req, res) => {
  const posts = await client.post.findMany();
  return res.status(200).json(posts);
}

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await client.post.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  return res.status(200).json(post);
}

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await client.post.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      content
    }
  });

  return res.status(200).json(post);
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  await client.post.delete({
    where: {
      id: parseInt(id)
    }
  });

  return res.status(204).send();
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};

