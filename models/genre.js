const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Genre Title is Mandatory'],
        trim: true,
        unique: [true, "Genre Title is not unique"],
    },
    genreDescription: {
        type: String,
        maxLength: [200, 'Description cannot exceed 200 words'],
    },
    genreStatus: {
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

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;