import express from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/comments', checkAuth, createComment);
router.get('/comments/:postId', getCommentsByPostId);

export default router;
