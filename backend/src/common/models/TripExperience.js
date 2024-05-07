import { Model } from "sequelize";
import { Experience } from "./Experience.js";
import { Trip } from "./Trip.js";

export class TripExperience extends Model {
  otherPublicField;
}

// -----*** CREATE ***------

// Create new TripExperience
export function createTripExperience(tripexperience) {
  return TripExperience.create(tripexperience);
}

// -----*** READ ***-----

// Return all existing TripExperiences matching given query parameters
// Utilize sequelize eager loading to inner join and query for experiences
// associated with TripId provided in query.
export async function findAllTripExperiences(query) {
  console.log(query);
  return Experience.findAll({
    include: {
      model: Trip,
      required: true,
      attributes: [],
      through: {
        where: query,
        attributes: [],
      },
    },
  });
}

// -----*** UPDATE ***------

// Update functionality not needed for this Model

// -----*** DELETE ***------

// Delete an existing TripExperience
export function deleteTripExperience(query) {
  return TripExperience.destroy({
    where: query,
  });
}

export default TripExperience;
