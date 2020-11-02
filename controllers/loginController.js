import loginService from '../services/loginService.js';

const login = async (req, res) => {
    try {
        const login = await loginService.login(req.body.user, req.body.password);
        res.send(login);
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

const logout = async (_req, _res) => {

    res.json({ auth: false, token: null });
    
}

export default { login, logout };