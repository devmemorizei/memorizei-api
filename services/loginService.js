import userService from '../services/userService.js';
import { validCPF } from '../utils/CPFValidator.js';
import { generateErrorDefault } from '../utils/generateErrorApi.js';

const login = async (user, password) => {

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

    if (!(await userLogin.user.compareHash(password))) return generateErrorDefault('Senha incorreta!');

    let response = {
        user,
        token: userLogin.user.generateToken()
    };

    return response;
}

export default { login };
