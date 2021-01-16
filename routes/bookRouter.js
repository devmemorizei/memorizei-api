import express from 'express';
import controller from '../controllers/bookController.js';
import authJwt from '../utils/authJwt.js';

const app = express();

app.get('/', authJwt.verifyJWT, controller.getAllBooks);

export { app as bookRouter };
