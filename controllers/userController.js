import userService from '../services/userService.js';

const create = async (req, res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return  res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await userService.findAll({});
        res.send(users);
    } catch (e) {
        return res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    }
}

export default { create, getAll};