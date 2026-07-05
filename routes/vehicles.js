import express from "express";
import { seedData } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(seedData.vehicles);
});

router.get("/:vehicleId", (req, res) => {
    const id = Number(req.params.vehicleId);
    const vehicle = seedData.vehicles.find((item) => item.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    const vehiclePings = seedData.pings.filter((ping) => ping.vehicle_id === id);
    const lastPing = vehiclePings.at(-1) ?? null;

    return res.status(200).json({
        ...vehicle,
        last_ping: lastPing,
    });
});

router.get("/:vehicleId/pings", (req, res) => {
    const id = Number(req.params.vehicleId);
    const vehicle = seedData.vehicles.find((item) => item.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    const vehiclePings = seedData.pings.filter((ping) => ping.vehicle_id === id);
    return res.status(200).json(vehiclePings);
});

router.get("/:vehicleId/last-position", (req, res) => {
    const id = Number(req.params.vehicleId);
    const vehicle = seedData.vehicles.find((item) => item.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    const vehiclePings = seedData.pings.filter((ping) => ping.vehicle_id === id);
    const lastPing = vehiclePings.at(-1) ?? null;

    return res.status(200).json(lastPing);
});

export default router;
