const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bookStore')
        console.log("Mongodb connected")
    } catch (error) {
        console.error("Mongoose connection failed", error)
        process.exit(1)
    }
}

module.exports = connectToDb