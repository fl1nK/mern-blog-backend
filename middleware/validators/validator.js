import { body } from 'express-validator';

export const registerValidation = [
  body('fullname', 'Full name is required').notEmpty(),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('avatarUrl').optional().isString().withMessage('Avatar URL is not valid'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const postValidation = [
  body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }).isString(),
  body('text', 'Text must be at least 3 characters long').isLength({ min: 3 }).isString(),
  body('tags', 'Tags must be a string').optional().isString(),
  body('imageUrl', 'Image URL must be a valid URL').optional().isString(),
];
