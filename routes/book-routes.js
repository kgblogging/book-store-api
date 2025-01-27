const express = require('express')
const bookSchema = require('../models/book')
const router = express.Router()
const { getAllBooks, getBookById, addBook, updateBookById, deleteBookById } = require('../controllers/book-controller')
const queryHandler = require('../middleware/queryHandler');

// all the routes related to books only

router.post('/get-books', queryHandler(['title', 'author', 'year']), getAllBooks);
router.get('/get-book-by-id/', getBookById);
router.post('/add-book', addBook);
router.put('/update-book-by-id/', updateBookById);
router.delete('/delete-book-by-id/', deleteBookById)

module.exports = router


