const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://shahzi113:456shahzai@cluster0.elcovdn.mongodb.net/")
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB