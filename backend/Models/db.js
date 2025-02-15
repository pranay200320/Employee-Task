const mongoose = require("mongoose");
require("dotenv").config(); // Ensure environment variables are loaded

const DB_URL = process.env.MONGO_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected Successfully ✅"))
  .catch((err) => {
    console.error("MongoDB Connection Failed ", err.message);
  });
