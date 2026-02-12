const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removed deprecated options (useNewUrlParser, useUnifiedTopology) - no longer needed in Mongoose 6+
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Failed: ${error.message}`);
    console.warn('⚠️ Server will continue without database (caching disabled)');
    // Don't exit - allow server to run without MongoDB
  }
};

module.exports = connectDB;