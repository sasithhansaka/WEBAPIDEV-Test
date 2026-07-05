import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(seedData.districts);
});

router.get("/:districtId", (req, res) => {
  const id = Number(req.params.districtId);
  const district = seedData.districts.find((item) => item.id === id);

  if (!district) {
    return res.status(404).json({ error: "District not found" });
  }

  res.status(200).json(district);
});

export default router;
