import express from 'express';
import controller from '../controllers/userController.js';
import authJwt from '../utils/authJwt.js';

const app = express();

app.post('/', controller.create);
app.get('/', authJwt.verifyJWT, controller.getOne);
app.put('/', authJwt.verifyJWT, controller.update);

export { app as userRouter };
