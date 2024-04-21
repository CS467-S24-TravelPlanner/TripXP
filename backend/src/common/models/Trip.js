import { Model } from "sequelize";

export class Trip extends Model {
  otherPublicField;
}

// -----*** CREATE ***------

// Create new Trip
export function createTrip(trip) {
  return Trip.create(trip);
}

// -----*** READ ***-----

// Return all existing Trips matching given query parameters
export function findAllTrips(query) {
  return Trip.findAll({
    where: query,
  });
}

// Find a specific Trip by ID - May not be needed
export function findTrip(tripId) {
  return Trip.findByPk(tripId);
}

// -----*** UPDATE ***------

// Update an existing Trip
export function updateTrip(query, updatedTrip) {
  return Trip.update(updatedTrip, {
    where: query,
  });
}

// -----*** DELETE ***------

// Delete an existing Trip
export function deleteTrip(query) {
  return Trip.destroy({
    where: query,
  });
}

export default Trip;
