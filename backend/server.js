const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const port = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require('./middleware/errorMiddleWare');
const connectDB = require('./config/db')

connectDB();
// Middleware to parse incoming requests with JSON payloads
app.use(express.json())

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }))

// Defining routes and their handlers
app.use('/api/books', require('./routes/bookRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Using the custom error handling middleware
app.use(errorHandler)

// Starting the server and listening on the specified port
app.listen(port, () => console.log(`server is run on port ${port}`))




//http://localhost:5000/api/books