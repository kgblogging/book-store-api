const express = require("express");
require("dotenv").config()
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDb = require('./database/db')
const bookRoute = require('./routes/book-routes')
const authRoute = require('./routes/auth-routes')
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware')

// connect to out database
connectToDb();

// app.use(cors())
app.use(cors({
    origin: '*', // Allow all origins (not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,
}));

app.use(express.json())


app.listen(PORT, () => {
    console.log("Server is running on port no - " + PORT)
})

app.use('/v1/api/books', authMiddleware, bookRoute)
app.use('/v1/api/auth', authRoute)

app.use(errorHandler);