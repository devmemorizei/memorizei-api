import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

const userModel = mongoose.model('user', usersSchema , 'user');

export { userModel };