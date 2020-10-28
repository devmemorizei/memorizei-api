import express from 'express';
import controller from '../controllers/userController.js';
import authJwt from '../utils/authJwt.js';

const app = express();

app.post('/', controller.create);
app.get('/', authJwt.verifyJWT, controller.getAll);

export { app as userRouter };
