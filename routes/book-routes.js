const express = require('express')
const router = express.Router()
const { getAllBooks, getBookById, addBook, updateBookById, deleteBookById } = require('../controllers/book-controller')
const queryHandler = require('../middleware/queryHandler');
const roleMiddleware = require('../middleware/roleMiddleware')

// all the routes related to books only

router.post('/get-books', queryHandler(['title', 'author', 'year']), getAllBooks);
router.get('/get-book-by-id/', getBookById);
router.post('/add-book', roleMiddleware(['superadmin']), addBook);
router.put('/update-book-by-id/', roleMiddleware(['admin', 'superadmin']), updateBookById);
router.delete('/delete-book-by-id/', roleMiddleware(['admin', 'superadmin']), deleteBookById)

module.exports = router


