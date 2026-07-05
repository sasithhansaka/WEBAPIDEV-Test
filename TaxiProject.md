# `taxiProject.md` Plan: Taxi Company Vehicle Tracking REST API

## Summary
Design the project as a full taxi-operations REST API for internal admin and dispatch use, while keeping phase 1 compatible with the current Express + seed JSON architecture.

The API should cover:
- Fleet entities: vehicles, drivers, device trackers, stations/service zones
- Operational entities: customers, bookings, trip assignments, trips, payments
- Tracking entities: live vehicle status, location pings, trip route history
- Admin views: availability, utilization, trip history, payment status

The document should position this as a phased build:
- Phase 1: seed/in-memory JSON with clean REST contracts
- Phase 2: swap persistence to SQL without changing public route shapes

## Key Changes
### Domain model
Define these core resources and relationships:
- `stations`: dispatch hubs or operating bases; reuse the current station concept but rename in docs from police-style sample data to taxi branches/depots
- `vehicles`: belongs to one station, may have one active device, one active assigned driver, many trips, many pings
- `drivers`: profile, license info, employment status, assigned station, optional current vehicle
- `customers`: rider identity and contact details
- `bookings`: passenger request before fulfillment; pickup/dropoff, requested time, passenger count, requested vehicle type, status
- `trip_assignments`: dispatcher assignment of a booking to a vehicle/driver
- `trips`: actual ride execution with lifecycle timestamps and fare summary
- `payments`: payment record for a trip
- `pings`: raw telemetry points for a vehicle/device
- `vehicle_status`: derived current state such as `idle`, `assigned`, `en_route_pickup`, `on_trip`, `offline`, `maintenance`

Recommended field set per resource:
- `vehicles`: `id`, `registration_number`, `fleet_code`, `vehicle_type`, `capacity`, `device_id`, `station_id`, `driver_id`, `status`, `last_ping_at`
- `drivers`: `id`, `employee_code`, `full_name`, `phone`, `license_number`, `license_expires_on`, `station_id`, `status`
- `customers`: `id`, `full_name`, `phone`, `email`, `default_payment_method`
- `bookings`: `id`, `customer_id`, `pickup_address`, `pickup_latitude`, `pickup_longitude`, `dropoff_address`, `dropoff_latitude`, `dropoff_longitude`, `requested_at`, `scheduled_for`, `vehicle_type`, `passenger_count`, `status`, `notes`
- `trip_assignments`: `id`, `booking_id`, `vehicle_id`, `driver_id`, `assigned_at`, `assigned_by`, `status`
- `trips`: `id`, `booking_id`, `vehicle_id`, `driver_id`, `started_at`, `arrived_pickup_at`, `completed_at`, `distance_km`, `duration_minutes`, `base_fare`, `distance_fare`, `time_fare`, `total_fare`, `status`
- `payments`: `id`, `trip_id`, `method`, `currency`, `amount`, `status`, `paid_at`, `reference`
- `pings`: `id`, `vehicle_id`, `latitude`, `longitude`, `speed_kph`, `heading`, `recorded_at`

### Route design
Document versioned routes under `/v1/api` and use resource envelopes:
- `GET /stations`
- `GET /stations/:stationId`
- `GET /stations/:stationId/vehicles`
- `GET /vehicles`
- `GET /vehicles/:vehicleId`
- `GET /vehicles/:vehicleId/pings`
- `GET /vehicles/:vehicleId/last-position`
- `GET /vehicles/:vehicleId/trips`
- `GET /drivers`
- `GET /drivers/:driverId`
- `GET /drivers/:driverId/trips`
- `GET /customers`
- `GET /customers/:customerId`
- `GET /bookings`
- `GET /bookings/:bookingId`
- `POST /bookings`
- `PATCH /bookings/:bookingId`
- `POST /bookings/:bookingId/assignments`
- `GET /trips`
- `GET /trips/:tripId`
- `POST /trips`
- `PATCH /trips/:tripId`
- `POST /trips/:tripId/start`
- `POST /trips/:tripId/complete`
- `GET /payments`
- `GET /payments/:paymentId`
- `POST /payments`

Also include filtered list patterns:
- `/vehicles?status=idle&station_id=2`
- `/drivers?status=available`
- `/bookings?status=pending&scheduled_for=2026-07-05`
- `/trips?vehicle_id=10&from=2026-07-01&to=2026-07-05`

### Representation style
Document consistent response shapes:
- Success list: `{ "data": [...], "meta": { ... } }`
- Success item: `{ "data": { ... } }`
- Error: `{ "error": { "code": "not_found", "message": "Vehicle not found" } }`

For expanded resources, include lightweight nested summaries instead of full deep embeds:
- vehicle with `station`, `driver`, `last_position`
- trip with `customer`, `vehicle`, `driver`, `payment`
- booking with `customer` and latest `assignment`

State transitions to document:
- booking: `pending -> assigned -> in_progress -> completed | cancelled`
- trip: `assigned -> en_route_pickup -> on_trip -> completed | cancelled`
- vehicle: `idle | assigned | on_trip | offline | maintenance`
- payment: `pending | paid | failed | refunded`

### Phase-by-phase implementation guidance
Phase 1:
- Keep route modules similar to current structure
- Expand `seed.json` to include new resources
- Add lookup helpers to join related data in responses
- Preserve current `vehicles` and `pings` endpoints, but upgrade them to envelope responses

Phase 2:
- Move seed arrays to SQL tables with foreign keys
- Keep route paths and field names stable
- Add pagination, sorting, validation, and auth middleware once persistence is real

## Test Plan
Document these expected scenarios:
- List vehicles filtered by station and status
- Fetch vehicle details with current driver and last position
- Return `404` for unknown vehicle, driver, booking, or trip
- Create a booking with valid pickup/dropoff data
- Reject booking creation when required coordinates or customer info are missing
- Assign a booking only to an available driver and idle vehicle
- Start a trip only after assignment exists
- Complete a trip and generate payment summary
- Return vehicle ping history in chronological order
- Show correct state transitions for booking, trip, payment, and vehicle
- Ensure derived vehicle status changes when assignment/trip state changes

## Assumptions
- Primary audience is internal admin and dispatch users, not the rider mobile app
- Public API remains REST-oriented and versioned under `/v1/api`
- Resource envelopes are preferred over raw arrays/objects
- Authentication and authorization are out of scope for the first document, but the doc should reserve space for future role-based access
- Fare calculation can be documented as a simple composed total in v1, without surge pricing or coupons
- “Stations” should represent taxi branches/depots in the business case, even though current sample seed data uses another domain
- `taxiProject.md` should be written as a planning/specification document, not implementation code
