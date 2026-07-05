import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
<<<<<<< HEAD
    res.status(200).json(seedData.pings);
=======
  res.status(200).json(seedData.pings);
>>>>>>> be134a919c578c0b6824d7eb18c2bb520ce56d40
});

export default router;
