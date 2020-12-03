import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

usersSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified("password")) next();
  
    this.password = await bcrypt.hash(this.password, 8);
});

usersSchema.methods = {
    compareHash(hash) {
      return bcrypt.compare(hash, this.password);
    },
  
    generateToken() {
      return jwt.sign({ id: this.id }, process.env.SECRET, {
        expiresIn: 86400
      });
    }
};

const userModel = mongoose.model('user', usersSchema , 'user');

export { userModel };