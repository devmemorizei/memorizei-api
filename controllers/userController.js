import ClientService from '../services/userService.js';

const create = async (req, res) => {
    try {
        const response = await ClientService.create(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return  res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

export default { create };