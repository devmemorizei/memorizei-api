import userService from '../services/userService.js';
import { validCPF } from '../utils/CPFValidator.js';
import { generateErrorDefault } from '../utils/generateErrorApi.js';
import { transporter } from '../utils/sendEmail.js';

const login = async (user, password) => {

    let userLogin = getUser(user);

    if (!(await userLogin.user.compareHash(password))) return generateErrorDefault('Senha incorreta!');

    let response = {
        user,
        token: userLogin.user.generateToken()
    };

    return response;
}

const sendNewPassword = async emailUser => {

    let userLogin = await getUser(emailUser);

    console.log(emailUser);
    console.log(userLogin);

    let emailSended = await transporter.sendMail({
        from: '"Equipe Memorizei 👻" <dev.memorizei@gmail.com>',
        to: userLogin.user.email,
        subject: "Hello ✔", // Subject line
        html: "<b>Hello world?</b>", // html body
    });

    console.log(emailSended);

    if(emailSended.messageId)
        return true;
    else
        return false;
};

const getUser = async user => {

    let conditions = {};

    if(validCPF(user)){
        conditions = {
            cpf: user
        };    
    } else {
        conditions = {
            email: user
        };
    }

    let userLogin = await userService.findOne(conditions);

    if(!userLogin.user) return generateErrorDefault('Usuário não encontrado!');

    return userLogin;
}

export default { login, sendNewPassword };
