import express from 'express';
import controller from '../controllers/userController.js';

const app = express();

app.post('/', controller.create);

export { app as userRouter };
