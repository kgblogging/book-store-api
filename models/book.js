const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book Title is Mandatory'],
        trim: true,
        maxLength: [100, 'Book Title cannot be more than 100 Characters'],
        unique: [true, "Book Name is not unique"],
    },
    author: {
        type: String,
        required: [true, 'Author name is Mandatory'],
        trim: true,
    },
    year: {
        type: String,
        required: [true, 'Publication  Year is Mandatory'],
        trim: true,
        min: [1970, 'Publishing Year Must be greated than 1970'],
        max: [new Date().getFullYear, 'Year cannot be take in future']
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
    },
    bookIntroduction: {
        type: String,
        required: [true, 'Book Introduction is Mandatory'],
        maxLength: [500, 'Book Introduction cannot exceed 500 words'],
    },
    bookStatus: {
        type: Number,
        enum: [0, 1], // 0 = inactive, 1 = active
        required: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;