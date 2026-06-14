// const express = require("express");
import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
    res.send("Api is running...");
});


const startServer = async () => {
  try {
        // await connectDB();
        // console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;