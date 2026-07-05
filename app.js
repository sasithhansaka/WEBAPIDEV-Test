import express from "express";
import "dotenv/config";
import provincesRouter from "./routes/provinces.js";
import districtsRouter from "./routes/districts.js";
import stationsRouter from "./routes/stations.js";
import vehiclesRouter from "./routes/vehicles.js";
import pingsRouter from "./routes/pings.js";

const app = express();

app.get("/", (req, res) => {
    res.json({
        status: "OK",
        session: "NB6007CEMS2",
    });
});

app.use("/v1/api/provinces", provincesRouter);
app.use("/v1/api/districts", districtsRouter);
app.use("/v1/api/stations", stationsRouter);
app.use("/v1/api/vehicles", vehiclesRouter);
app.use("/v1/api/pings", pingsRouter);


const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

export default app;
