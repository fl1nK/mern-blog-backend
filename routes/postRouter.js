import express from 'express';
import { postValidation } from '../middleware/validators/validator.js';
import { validateError } from '../middleware/validateMiddleware.js';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getLastTags,
  getPostsByTag,
} from '../controllers/postController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/posts', checkAuth, postValidation, validateError, createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', checkAuth, postValidation, validateError, updatePost);
router.delete('/posts/:id', checkAuth, deletePost);
router.get('/postsByTag/:tag', getPostsByTag);

router.get('/tags', getLastTags);

export default router;
