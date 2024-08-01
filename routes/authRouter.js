import express from 'express';

import { register, login, getMe } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../middleware/validators/validator.js';

import { checkAuth } from '../middleware/authMiddleware.js';
import { validateError } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/auth/register', registerValidation, validateError, register);
router.post('/auth/login', loginValidation, validateError, login);
router.get('/auth/me', checkAuth, getMe);

export default router;
