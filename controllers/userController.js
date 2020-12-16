import userService from '../services/userService.js';

const create = async (req, res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return  res.status(500).send({ message: error.message});
    }
};

const update = async (req, res) => {
    try {
        let userCondition = {
            email: req.query.email
        };
        const user = await userService.findOne(userCondition);

        let updatedUser = Object.assign(user.user, req.body);
        
        const response = await userService.updateUser(updatedUser);
        return res.status(201).json(response);
    } catch (error) {
        return  res.status(500).send({ message: error.message});
    }
};

const getOne = async (req, res, _next) => {
    try {
        let userCondition = {
            email: req.query.userEmail
        };        
        const user = await userService.findOne(userCondition);

        const {name, birthDate, email, cpf, homePhone, cellPhone } = user.user;
        let userResponse = {
            name: name,
            birthDate: birthDate,
            email: email,
            cpf: cpf,
            homePhone: homePhone,
            cellPhone, cellPhone
        };

        res.send(userResponse);

    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

const getAll = async (_req, res, _next) => {
    try {
        const users = await userService.findAll({});
        res.send(users);
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

export default { create, getAll, getOne, update};