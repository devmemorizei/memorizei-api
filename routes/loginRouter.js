import express from 'express';
import controller from '../controllers/loginController.js';

const app = express();

app.post('/login', controller.login);
app.post('/logout', controller.logout);

export { app as loginRouter };
