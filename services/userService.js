import { userModel } from '../models/userModel.js';
import { validCPF } from '../utils/CPFValidator.js';
import { generateErrorDefault } from '../utils/generateErrorApi.js';

const create = async (user) => {

    user.cpf = getOnlyNumber(user.cpf);
    user.homePhone = getOnlyNumber(user.cpf);
    user.cellPhone = getOnlyNumber(user.cpf);

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
    
    return { user };
}

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

export default { create, findAll, findOne };
