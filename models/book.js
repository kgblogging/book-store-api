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
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;