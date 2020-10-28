import { userModel } from '../models/userModel.js';

const create = async (client) => { 
    const userRecord = new userModel(client);
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

export default { create, findAll, findOne };
