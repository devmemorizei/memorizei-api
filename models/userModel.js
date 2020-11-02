import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    homePhone: {
        type: String,
        required: false
    },
    cellPhone: {
        type: String,
        required: false
    },
    typeUser: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const userModel = mongoose.model('user', usersSchema , 'user');

export { userModel };