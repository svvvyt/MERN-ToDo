import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { TaskController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://svvvyt:Ugngbnm19@cluster0.uphhegh.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log(`DB error: ${err}`));

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.get('/tasks', TaskController.getAll);
app.get('/tasks/:id', TaskController.getOne);

app.post('/tasks', TaskController.createOne);
app.delete('/tasks/:id', TaskController.removeOne);
app.patch('/tasks/:id', TaskController.updateOne);

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
