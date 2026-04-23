require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/students", studentRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    if (err.message.includes('ECONNREFUSED')) {
      console.error("Hint: Network connection refused. It could be a DNS SRV resolution issue or IP whitelist.");
    }
  });