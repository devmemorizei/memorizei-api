import bookService from '../services/bookService.js';

const getAllBooks = async (_req, res, _next) => {
    try {
        const result = await bookService.findAll();
        res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

export default { getAllBooks };