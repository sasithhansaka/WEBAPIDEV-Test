import { mkdirSync, writeFileSync } from "fs";
import path from "path";

const provinces = [
  { id: 1, name: "Western" },
  { id: 2, name: "Central" },
  { id: 3, name: "Southern" },
  { id: 4, name: "Northern" },
  { id: 5, name: "Eastern" },
  { id: 6, name: "North Western" },
  { id: 7, name: "North Central" },
  { id: 8, name: "Uva" },
  { id: 9, name: "Sabaragamuwa" },
];

const districts = [
  { id: 1, name: "Colombo", province_id: 1 },
  { id: 2, name: "Gampaha", province_id: 1 },
  { id: 3, name: "Kalutara", province_id: 1 },
  { id: 4, name: "Kandy", province_id: 2 },
  { id: 5, name: "Matale", province_id: 2 },
  { id: 6, name: "Nuwara Eliya", province_id: 2 },
  { id: 7, name: "Galle", province_id: 3 },
  { id: 8, name: "Matara", province_id: 3 },
  { id: 9, name: "Hambantota", province_id: 3 },
  { id: 10, name: "Jaffna", province_id: 4 },
  { id: 11, name: "Kilinochchi", province_id: 4 },
  { id: 12, name: "Mannar", province_id: 4 },
  { id: 13, name: "Mullaitivu", province_id: 4 },
  { id: 14, name: "Vavuniya", province_id: 4 },
  { id: 15, name: "Batticaloa", province_id: 5 },
  { id: 16, name: "Ampara", province_id: 5 },
  { id: 17, name: "Trincomalee", province_id: 5 },
  { id: 18, name: "Kurunegala", province_id: 6 },
  { id: 19, name: "Puttalam", province_id: 6 },
  { id: 20, name: "Anuradhapura", province_id: 7 },
  { id: 21, name: "Polonnaruwa", province_id: 7 },
  { id: 22, name: "Badulla", province_id: 8 },
  { id: 23, name: "Monaragala", province_id: 8 },
  { id: 24, name: "Ratnapura", province_id: 9 },
  { id: 25, name: "Kegalle", province_id: 9 },
];

const stationSeeds = [
  { id: 1, name: "Colombo Fort Police Station", district_id: 1, latitude: 6.9344, longitude: 79.8428 },
  { id: 2, name: "Negombo Police Station", district_id: 2, latitude: 7.2083, longitude: 79.8358 },
  { id: 3, name: "Kalutara South Police Station", district_id: 3, latitude: 6.5854, longitude: 79.9607 },
  { id: 4, name: "Kandy Police Station", district_id: 4, latitude: 7.2906, longitude: 80.6337 },
  { id: 5, name: "Matale Police Station", district_id: 5, latitude: 7.4675, longitude: 80.6234 },
  { id: 6, name: "Nuwara Eliya Police Station", district_id: 6, latitude: 6.9497, longitude: 80.7891 },
  { id: 7, name: "Galle Police Station", district_id: 7, latitude: 6.0535, longitude: 80.221 },
  { id: 8, name: "Matara Police Station", district_id: 8, latitude: 5.9549, longitude: 80.555 },
  { id: 9, name: "Hambantota Police Station", district_id: 9, latitude: 6.1241, longitude: 81.1185 },
  { id: 10, name: "Jaffna Police Station", district_id: 10, latitude: 9.6615, longitude: 80.0255 },
  { id: 11, name: "Kilinochchi Police Station", district_id: 11, latitude: 9.3961, longitude: 80.3982 },
  { id: 12, name: "Mannar Police Station", district_id: 12, latitude: 8.981, longitude: 79.9042 },
  { id: 13, name: "Mullaitivu Police Station", district_id: 13, latitude: 9.2671, longitude: 80.814 },
  { id: 14, name: "Vavuniya Police Station", district_id: 14, latitude: 8.7514, longitude: 80.4971 },
  { id: 15, name: "Batticaloa Police Station", district_id: 15, latitude: 7.7102, longitude: 81.6924 },
  { id: 16, name: "Ampara Police Station", district_id: 16, latitude: 7.2975, longitude: 81.682 },
  { id: 17, name: "Trincomalee Police Station", district_id: 17, latitude: 8.5874, longitude: 81.2152 },
  { id: 18, name: "Kurunegala Police Station", district_id: 18, latitude: 7.4863, longitude: 80.3647 },
  { id: 19, name: "Puttalam Police Station", district_id: 19, latitude: 8.0362, longitude: 79.8283 },
  { id: 20, name: "Anuradhapura Police Station", district_id: 20, latitude: 8.3114, longitude: 80.4037 },
  { id: 21, name: "Polonnaruwa Police Station", district_id: 21, latitude: 7.9403, longitude: 81.0188 },
  { id: 22, name: "Badulla Police Station", district_id: 22, latitude: 6.9934, longitude: 81.055 },
  { id: 23, name: "Monaragala Police Station", district_id: 23, latitude: 6.8722, longitude: 81.3507 },
  { id: 24, name: "Ratnapura Police Station", district_id: 24, latitude: 6.6828, longitude: 80.3992 },
  { id: 25, name: "Kegalle Police Station", district_id: 25, latitude: 7.2513, longitude: 80.3464 },
];

const stations = stationSeeds.map(({ latitude, longitude, ...station }) => station);
const stationCoordinates = new Map(
  stationSeeds.map((station) => [
    station.id,
    { latitude: station.latitude, longitude: station.longitude },
  ])
);

const platePrefixes = ["WP", "CP", "SP", "NP", "EP", "NW", "NC", "UP", "SG"];
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const dates = [
  "2026-06-14",
  "2026-06-15",
  "2026-06-16",
  "2026-06-17",
  "2026-06-18",
  "2026-06-19",
  "2026-06-20",
];
const dailyPingTimes = ["07:15", "10:30", "13:45", "17:00", "20:15", "22:30"];

const registrationNumberFor = (vehicleId, stationId) => {
  const prefix = platePrefixes[(stationId - 1) % platePrefixes.length];
  const left = alpha[Math.floor((vehicleId - 1) / 26) % 26];
  const right = alpha[(vehicleId - 1) % 26];
  const serial = String(1000 + vehicleId).slice(-4);

  return `${prefix} ${left}${right}-${serial}`;
};

const vehicles = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    registration_number: registrationNumberFor(id, (index % stations.length) + 1),
    device_id: `TTM-DEV-${String(id).padStart(4, "0")}`,
    station_id: (index % stations.length) + 1,
  };
});

const pings = [];
let pingId = 1;

for (const vehicle of vehicles) {
  const base = stationCoordinates.get(vehicle.station_id);

  for (let dayIndex = 0; dayIndex < dates.length; dayIndex += 1) {
    for (let timeIndex = 0; timeIndex < dailyPingTimes.length; timeIndex += 1) {
      const latOffset = ((((vehicle.id * 7) + (dayIndex * 3) + (timeIndex * 2)) % 21) - 10) * 0.0012;
      const lonOffset = ((((vehicle.id * 11) + (dayIndex * 5) + (timeIndex * 4)) % 21) - 10) * 0.0014;
      const [hour, minute] = dailyPingTimes[timeIndex].split(":");

      pings.push({
        id: pingId,
        vehicle_id: vehicle.id,
        latitude: Number((base.latitude + latOffset).toFixed(6)),
        longitude: Number((base.longitude + lonOffset).toFixed(6)),
        timestamp: `${dates[dayIndex]}T${hour}:${minute}:00+05:30`,
      });

      pingId += 1;
    }
  }
}

const dataset = {
  provinces,
  districts,
  stations,
  vehicles,
  pings,
};

const outputDirectory = path.resolve("data");
const outputFile = path.join(outputDirectory, "seed.json");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");

console.log(`Seed data written to ${outputFile}`);
