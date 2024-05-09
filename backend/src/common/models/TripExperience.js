import { Model } from "sequelize";

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
