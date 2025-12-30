import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';
import router from './routes';

// Store all variables in .env as Environment Variables
dotenv.config();

const app = express();
app.use(express.json()); // return request as json object
app.use(router);

const port = process.env.PORT || 3000;

// Start the app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});