import userService from '../services/userService.js';
import { validCPF } from '../utils/CPFValidator.js';
import { generateErrorDefault } from '../utils/generateErrorApi.js';
import { transporter } from '../utils/sendEmail.js';

const login = async (user, password) => {

    let userLogin = await getUser(user);
    let userName = userLogin.user.name;
    let userEmail = userLogin.user.email; 
    
    if (!(await userLogin.user.compareHash(password))) return generateErrorDefault('Senha incorreta!');

    let response = {
        userName,
        userEmail,
        token: userLogin.user.generateToken()
    };

    return response;
}

const sendNewPassword = async emailUser => {
    let userLogin = await getUser(emailUser);
    
    let newPassword = await userService.resetPassword(userLogin.user);
    
    let emailSended = await transporter.sendMail({
        from: '"Equipe Memorizei" <dev.memorizei@gmail.com>',
        to: userLogin.user.email,
        subject: "Esqueci minha senha",
        html: `<p>Olá ${ userLogin.user.name },</p>
        <p>Utilize a senha abaixo para realizar seu login e logo após, vá em alterar minha senha.</p>
        <p>${ newPassword }</p>`
    });

    if(emailSended.messageId){
        return true;
    }
    else {
        return false;
    }
};

const changePassword = async (emailUser, oldPassword, newPassword) => {
    let userLogin = await getUser(emailUser);

    let passwordChanged = await userService.changePassword(userLogin.user, oldPassword, newPassword);

    if(passwordChanged.message){
        return passwordChanged;
    } else{
        return true;
    }
}

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
    
    return userLogin;
}

export default { login, sendNewPassword, changePassword };
