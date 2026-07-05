import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(seedData.pings);
});

export default router;
