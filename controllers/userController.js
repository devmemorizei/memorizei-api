import userService from '../services/userService.js';

const create = async (req, res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return  res.status(500).send({ message: error.message});
    }
};

const getAll = async (_req, res, _next) => {
    try {
        const users = await userService.findAll({});
        res.send(users);
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

export default { create, getAll};