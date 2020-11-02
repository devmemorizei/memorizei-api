import { userModel } from '../models/userModel.js';

const create = async (user) => { 

    if(!validCPF(user.cpf)) throw new Error('CPF inválido!');

    const userExist = await userAlreadyExist(user.email, user.cpf);
    if(userExist) throw new Error('CPF ou E-mail já cadastrados!');

    const userRecord = new userModel(user);
    await userRecord.save();
    
    return { client: userRecord }; 
}

const findAll = async () => {

    const users = await userModel.find({});
    
    return { users };
}

const findOne = async (conditions) => {

    const user = await userModel.find(conditions).exec();
    
    return { user };
}

const validCPF = cpfUser => {
    
    cpfUser = cpfUser.replace(/[^\d]+/g,'');
    
    if(cpfUser.length < 11) return false;

    var Soma;
    var Resto;
    Soma = 0;
    if (cpfUser == "00000000000") return false;

    for (var i=1; i<=9; i++) Soma = Soma + parseInt(cpfUser.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpfUser.substring(9, 10)) ) return false;

    Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfUser.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpfUser.substring(10, 11) ) ) return false;
        return true;
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

    if(userLogin.user.length == 0) return false;

    return true;
}

export default { create, findAll, findOne };
