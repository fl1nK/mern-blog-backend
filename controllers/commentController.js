import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.userId;

    const comment = new Comment({
      text,
      postId,
      user: userId,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'fullname avatarUrl')
      .exec();

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не вдалося створити коментар' });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).populate('user', 'fullname avatarUrl').exec();

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не вдалося отримати коментарі' });
  }
};
