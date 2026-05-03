const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log("Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.log("MongoDB Error:", err.message);
  }
};

module.exports = connectToMongo;