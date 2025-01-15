const Book = require("../models/book")

const getAllBooks = async (req, res, next) => {
    try {
        const allBook = await Book.find()
        if (allBook.length) {
            res.status(200).json({
                success: true,
                count: allBook.length,
                data: allBook
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'No Book Found',
                data: allBook
            })
        }
    } catch (error) {
        next(error)
    }
}
const getBookById = async (req, res, next) => {
    try {
        const id = req.body.id
        if (!id) {
            res.status(404).json({
                success: true,
                message: 'ID Not found',
            })
        } else {
            const getBookById = await Book.findById(id)
            res.status(200).json({
                success: true,
                message: 'Book fetched Successfully',
                data: getBookById
            })
        }
    } catch (error) {
        next(error);
    }
}
const addBook = async (req, res, next) => {
    try {
        const newBookData = req.body;
        const createdBook = await Book.create(newBookData)
        if (createdBook) {
            res.status(201).json({
                success: true,
                message: 'Book Added Successfully',
                data: createdBook
            })
        }
    } catch (error) {
        next(error);
    }
}
const updateBookById = async (req, res, next) => {
    try {
        const { id, ...updateData } = req.body; // Extract the ID and the fields to update

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required for updating',
            });
        }

        // Perform the update
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // `new: true` ensures the updated document is returned
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        next(error); // Pass errors to the error-handling middleware
    }
};

const deleteBookById = async (req, res, next) => {
    try {
        const id = req.body.id
        if (id) {
            // Pass the filter object to deleteOne
            const deleteBook = await Book.deleteOne({ _id: id });

            if (deleteBook.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: deleteBook,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'ID is required to delete a book',
            });
        }
    } catch (error) {
        next(error);
    }
}
module.exports = { getAllBooks, getBookById, addBook, updateBookById, deleteBookById }
