import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(seedData.provinces);
});

router.get("/:provinceId", (req, res) => {
    const id = Number(req.params.provinceId);
    const province = seedData.provinces.find((item) => item.id === id);

    if (!province) {
        return res.status(404).json({ error: "Province not found" });
    }

    return res.status(200).json(province);
});

export default router;
