const express = require("express");
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDb = require('./database/db')
const bookRoute = require('./routes/book-routes')
const errorHandler = require('./middleware/errorHandler');

// connect to out database
connectToDb();

app.use(express.json())


app.listen(PORT, () => {
    console.log("Server is running on port no -" + PORT)
})

app.use('/api/books', bookRoute)

app.use(errorHandler);