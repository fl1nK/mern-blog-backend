import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';
import commentRoutes from './routes/commentRoutes.js';
import { checkAuth } from './middleware/authMiddleware.js';

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.use('/', authRouter);
app.use('/', postRouter);
app.use('/', commentRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log('DB connected and server us running.');
  })
  .catch((err) => {
    console.log(err);
  });
