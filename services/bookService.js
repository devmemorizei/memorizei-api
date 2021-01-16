import { bookModel } from '../models/bookModel.js';

const findAll = async () => {

    const books = await bookModel.find({});
    
    return { books };
}
export default { findAll };