const express = require('express')
const bookSchema = require('../models/book')
const router = express.Router()
const { getAllBooks, getBookById, addBook, updateBookById, deleteBookById } = require('../controllers/book-controller')

// all the routes related to books only

router.get('/get-books',getAllBooks);
router.get('/get-book-by-id/', getBookById);
router.post('/add-book', addBook);
router.put('/update-book-by-id/', updateBookById);
router.delete('/delete-book-by-id/', deleteBookById)

module.exports = router


