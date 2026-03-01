const mongoose = require("mongoose");
exports.connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log("MongoDb is connected");
    }
  } catch (error) {
    console.log(error);
  }
};
