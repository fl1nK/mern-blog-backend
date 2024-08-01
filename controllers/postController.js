import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      tags: req.body.tags.split(','),
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'fullname email avatarUrl')
      .sort({ createdAt: -1 })
      .exec();

    const postsWithCommentsCount = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await Comment.countDocuments({ postId: post._id });
        return {
          ...post._doc,
          commentsCount,
        };
      }),
    );

    res.status(200).json(postsWithCommentsCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewsCount: 1 } },
      { new: true },
    ).populate('user');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        tags: req.body.tags.split(','),
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      },
      { new: true },
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5).exec();

    const tags = [...new Set(posts.flatMap((obj) => obj.tags))].slice(0, 5);

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await Post.find({ tags: tag })
      .populate('user', 'fullname email avatarUrl')
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
