import { userModel } from '../models/userModel.js';

const create = async (client) => { 
    const userRecord = new userModel(client);
    await userRecord.save();
    
    return { client: userRecord }; 
}

export default { create };
