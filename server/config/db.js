// config/db.js — MongoDB connection via Mongoose

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Note: `useNewUrlParser` / `useUnifiedTopology` are no longer needed.
    // Mongoose 8 (Node driver 6) removed them and logs a deprecation warning if passed.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;