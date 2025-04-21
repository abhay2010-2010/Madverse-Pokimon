const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const DbConnect = require("./config/DB");
const Router = require("./routes/poke.routes");

dotenv.config();
const app = express();


//middlewares//
app.use(cors({
  origin: "http://localhost:5174", // ✅ no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // optional: if you're using cookies/auth
}));


app.use(express.json());
app.use("/api",Router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await DbConnect
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
