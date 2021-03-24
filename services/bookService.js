import moment from 'moment';
import { bookModel } from '../models/bookModel.js';
import { userQuestionModel } from '../models/userQuestionModel.js';
import calculateDateNextAnswer from '../utils/calculateDateNextAnswer.js';

const findAll = async () => {

    const books = await bookModel.find({});
    
    return { books };
}

const findOneUserAnswer = async (objUserQuestion) => {
    const userAnswer = await userQuestionModel.findOne({
        bookId: objUserQuestion.bookId,
        titleId: objUserQuestion.titleId,
        chapterId: objUserQuestion.chapterId,
        questionId: objUserQuestion.questionId,
        userId: objUserQuestion.userId,
    });   

    return { userAnswer };
}

const handleAnswerUser = async (objUserQuestion) => {

    var updated = null,
        save = null,
        userQuestion = null;

    userQuestion = await findOneUserAnswer(objUserQuestion);
    
    if(userQuestion.userAnswer){
        userQuestion.userAnswer.grade = objUserQuestion.grade;
        updated = await updateDateAnswerUser(userQuestion.userAnswer);
        return updated;
    } else {
        save = await saveAnswerUser(objUserQuestion);
        return save;
    }
};

const saveAnswerUser = async (objUserQuestion) => {

    let item = {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
    };

    calculateNewDateAnswer(objUserQuestion, item);

    const userQuestionRecord = new userQuestionModel(objUserQuestion);
    await userQuestionRecord.save();
    
    return { client: userQuestionRecord };
};

const updateDateAnswerUser = async (objUserQuestion) => {
    
    let item = {
        interval: objUserQuestion.interval,
        repetition: objUserQuestion.repetition,
        efactor: objUserQuestion.efactor,
    };

    calculateNewDateAnswer(objUserQuestion, item);

    const userQuestionUpdated = await userQuestionModel.findOneAndUpdate(
        {
            bookId: objUserQuestion.bookId,
            titleId: objUserQuestion.titleId,
            chapterId: objUserQuestion.chapterId,
            questionId: objUserQuestion.questionId,
            userId: objUserQuestion.userId,
        },
        objUserQuestion,
        {new: true });
    
    return { userQuestionUpdated };
}

const getUserAnswers = async (userId, bookId, titleId, chapterId) => {
    const answersUser = await userQuestionModel.find({
        bookId: bookId,
        titleId: titleId,
        chapterId: chapterId,
        userId, userId
    }).sort('repeatAt');
    
    return { answersUser };
};

const calculateNewDateAnswer = (objUserQuestion, item) => {

    var superMemo = calculateDateNextAnswer.supermemo(item, objUserQuestion.grade);
    objUserQuestion.interval = superMemo.interval;
    objUserQuestion.repetition = superMemo.repetition;
    objUserQuestion.efactor = superMemo.efactor;

    var dateNow = moment(objUserQuestion.repeatAt);
    var dataAdd = dateNow.add(objUserQuestion.interval, 'd');

    objUserQuestion.repeatAt = dataAdd.subtract(3, 'hours');
}

export default { findAll, handleAnswerUser, getUserAnswers };