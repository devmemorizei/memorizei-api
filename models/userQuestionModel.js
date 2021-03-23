import mongoose from 'mongoose';

const userQuestionSchema = mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    titleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    correctAnswer: {
        type: Boolean,
        required: true
    },
    repeatAt: {
        type: Date,
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    repetition: {
        type: Number,
        required: true
    },
    efactor: {
        type: Number,
        required: true
    }
});

const userQuestionModel = mongoose.model('userQuestion', userQuestionSchema , 'userQuestion');

export { userQuestionModel };