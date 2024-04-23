import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import './utils/connection.js';
import auth from './routes/auth.route.js';
import chat from './routes/chat.route.js';
import user from './routes/user.route.js';
import contact from './routes/contact.route.js';
import { verifyToken } from './middleware/verifyToken.middleware.js';

const app = express();
app.use(
  cors({
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'x-access-token',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/auth', auth);

app.use('/chat', verifyToken, chat);

app.use('/user', verifyToken, user);

app.use('/contact', verifyToken, contact);

app.listen(port, () => {
  console.log(`App running on: http://localhost:${port}`);
});

export default app;
