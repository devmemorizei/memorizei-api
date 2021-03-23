import express from 'express';
import controller from '../controllers/bookController.js';
import authJwt from '../utils/authJwt.js';

const app = express();

app.get('/', authJwt.verifyJWT, controller.getAllBooks);
app.post('/userAnswer', authJwt.verifyJWT, controller.handleAnswerUser);
app.get('/getUserAnswers', authJwt.verifyJWT, controller.getUserAnswers);

export { app as bookRouter };
