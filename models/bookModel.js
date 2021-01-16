import mongoose from 'mongoose';

const booksSchema = mongoose.Schema({
    bookDescription: {
        type: String,
        required: true
    },
    title: [
        {
            descriptionTitle: String,
            free: Boolean,
            chapter: [
                {
                    descriptionChapter: String,
                    questions: [
                        {
                            questionDescription: String,            
                            correctAnswers: {
                                answerExpecteded: String
                            }
                        }
                    ]
                }
            ],
            questions: [
                {
                    questionDescription: String,            
                    correctAnswers: {
                        answerExpecteded: String
                    }
                }
            ]
        }
    ]
    
});

const bookModel = mongoose.model('book', booksSchema , 'book');

export { bookModel };