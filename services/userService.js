import bcrypt from 'bcryptjs';

import { userModel } from '../models/userModel.js';
import { validCPF } from '../utils/CPFValidator.js';
import { generateErrorDefault } from '../utils/generateErrorApi.js';

const create = async (user) => {

    user.cpf = getOnlyNumber(user.cpf);
    user.homePhone = getOnlyNumber(user.homePhone);
    user.cellPhone = getOnlyNumber(user.cellPhone);

    if(!validCPF(user.cpf)) return generateErrorDefault('CPF inválido!');

    const userExist = await userAlreadyExist(user.email, user.cpf);
    if(userExist) return generateErrorDefault('CPF ou E-mail já cadastrados!');

    const userRecord = new userModel(user);
    await userRecord.save();
    
    return { client: userRecord };
}

const findAll = async () => {

    const users = await userModel.find({});
    
    return { users };
}

const findOne = async (conditions) => {

    const user = await userModel.findOne(conditions);

    if (!user) throw new Error('Usuário não encontrado!');
    
    return { user };
}

const resetPassword = async (user) => {

    let newPassword = generatePassword();
    user.password = await bcrypt.hash(newPassword, 8);
    
    await updateUser(user);

    return newPassword;
};

const changePassword = async (user, oldPassword, newPassword) => {

    let senhaAtualCorreta = await user.compareHash(oldPassword);

    if (!senhaAtualCorreta) return generateErrorDefault('Senha atual incorreta!');
    if (newPassword.length < 6) return generateErrorDefault('A nova senha precisa possuir no mínimo 6 caracteres!');

    user.password = await bcrypt.hash(newPassword, 8);
    
    await updateUser(user);

    return newPassword;
};

const updateUser = async (user) => {
    if (!user) {
        return generateErrorDefault('Dados para atualização vazio');
    }

    user.cpf = getOnlyNumber(user.cpf);
    user.homePhone = getOnlyNumber(user.homePhone);
    user.cellPhone = getOnlyNumber(user.cellPhone);
    
    const id = user.id;

    const userUpdated = await userModel.findOneAndUpdate(
    {_id: id},
    user,
    {new: true });
                           
    if (!userUpdated) throw new Error('Ocorreu um erro ao atualizar o usuário');

    return { userUpdated };
};

const userAlreadyExist = async (email, cpf) => {

    const conditions = {
        $or: [
            {
                email: email                
            },
            {
                cpf: cpf
            }
        ]        
    }

    let userLogin = await findOne(conditions);

    if(!userLogin.user) return false;

    return true;
}

const getOnlyNumber = stringWithNumber => {
    return stringWithNumber.replace(/[^\d]+/g,'');
};

const generatePassword = () => {
    let length = 8,
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

export default { create, findAll, findOne, resetPassword, changePassword, updateUser };
