import jwt  from 'jsonwebtoken';
import userService from '../services/userService.js';

const login = async (user, password) => {
    let conditions = {
        email: user,
        password: password
    };

    let userLogin = await userService.findOne(conditions);

    if(userLogin.user.length == 0) return { message: 'Login inválido!' };

    let idUser = userLogin.user[0]._id;

    let token = jwt.sign({idUser}, process.env.SECRET, {
        expiresIn: 300
    });

    return { auth: true, token: token };
}

export default { login };
