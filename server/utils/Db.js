const mongoose = require('mongoose');

const URL = process.env.MONGODB_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(URL)
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection is failed");
        process.exit(0);
    }
}

module.exports = connectDb;