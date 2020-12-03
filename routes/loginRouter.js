import express from 'express';
import controller from '../controllers/loginController.js';
import authJwt from '../utils/authJwt.js';

const app = express();

app.post('/login', controller.login);
app.post('/logout', controller.logout);
app.post('/newPassword', controller.sendNewPassword);
app.post('/changePassword', authJwt.verifyJWT, controller.changePassword);
app.get('/verifyTokenIsValid', authJwt.verifyJWT, controller.verifyToken);

export { app as loginRouter };
