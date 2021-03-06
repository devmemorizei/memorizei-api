import bookService from '../services/bookService.js';

const getAllBooks = async (_req, res, _next) => {
    try {
        const result = await bookService.findAll();
        res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
}

const handleAnswerUser = async (req, res, _next) => {
    try{
        const result = await bookService.handleAnswerUser(req.body, req.userId);
        res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const getUserAnswers = async (req, res, _next) => {
    try{
        const result = await bookService.getUserAnswers(req.userId, req.query.bookId, req.query.titleId, req.query.chapterId);
        res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export default { getAllBooks, handleAnswerUser, getUserAnswers };