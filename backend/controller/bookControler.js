const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')
const User = require('../models/userModel')
const { error } = require('console')
// @desc    Get Books
// @route   GET /api/books
// @acces   Private
const getBooks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const options = {
        page,
        limit,
        sort: { createdAt: -1 }// repeat for concept?
    };
    const { docs, totalDocs, totalPages } = await Book.paginate({ user: req.res.id }, options)
    // const books = await Book.find({user: req.user.id})

    res.status(200).json({
        books: docs,
        totalDocs,
        totalPages,
    });
})

// @desc    Set goal
// @route   POSt/api/goals
// @acces   Private

const setBook = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.price) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        user: req.user.id,
    })
    res.status(200).json(book)
})

// @desc    Update goal
// @route   PUT/api/goals/:id
// @acces   Private

const updateBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
    }


    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged in user matchs the goal user
    if (book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
        })
    res.status(200).json(updatedBook)
})

// @desc    Delete goal
// @route   DELETE/api/goals 
// @acces   Private

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
    }



    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged in user matchs the goal user


    await book.deleteOne()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getBooks,
    setBook,
    updateBook,
    deleteBook
}