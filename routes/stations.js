import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(seedData.stations);
});

router.get("/:stationId", (req, res) => {
  const id = Number(req.params.stationId);
  const station = seedData.stations.find((item) => item.id === id);

  if (!station) {
    return res.status(404).json({ error: "Station not found" });
  }

  res.status(200).json(station);
});

export default router;
