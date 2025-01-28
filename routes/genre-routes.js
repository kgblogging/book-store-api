const express = require('express');
const { getGenreList, addGenre } = require('../controllers/genre-controller');
const router = express.Router()

// all the routes related to books only

router.get('/get-genre-list', getGenreList);
// router.get('/get-book-by-id/', getBookById);
router.post('/add-genre', addGenre);
// router.put('/update-book-by-id/', updateBookById);
// router.delete('/delete-book-by-id/', deleteBookById)

module.exports = router


