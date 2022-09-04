const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection to MONGODB successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close(() => {
    console.log("Connection to db closed and app terminated");
    process.exit(1);
  });
});
module.exports = db;
