import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import './utils/connection.js';

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

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

export default app;
