import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let seedData = {
    provinces: [],
    districts: [],
    stations: [],
    vehicles: [],
    pings: [],
};

try {
    const dataPath = path.join(__dirname, "data", "seed.json");
    seedData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (error) {
    console.warn("Could not load data/seed.json. Running with empty arrays.");
}

export { seedData };
