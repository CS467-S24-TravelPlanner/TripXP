import {
  createTripExperience as _createTripExperience,
  deleteTripExperience as _deleteTripExperience,
  findAllTripExperiences,
} from "./../../common/models/TripExperience.js";

// -----*** CREATE ***------

// Create a new TripExperience
export function createTripExperience(req, res) {
  const { params: params } = req;

  // Return Error if incorrect parameters provided
  if (Object.keys(params).length !== 2) {
    return res.status(400).json({
      status: false,
      error: {
        message:
          "Number of parameters required for creating a new TripExperience is 2.",
      },
    });
  }
  const tripExperience = { TripId: params.tripId, ExperienceId: params.expId };

  // Returns a 200 status and Success message upon successful creation
  _createTripExperience(tripExperience)
    .then(() => {
      return res.status(200).json({
        status: true,
        data: "Successfully added Experience to Trip.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// -----*** READ ***------

// Return all TripExperiences in DB matching given parameters. If no parameters are given,
// all tripexperiences are returned. If no TripExperiences match given parameters, data is empty.
export function getAllTripExperiences(req, res) {
  const { params: params } = req;

  findAllTripExperiences({ TripId: params.tripId })
    .then((tripexperiences) => {
      return res.status(200).json({
        status: true,
        data: tripexperiences,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// -----*** UPDATE ***------

// Update functionality not needed for this Model

// -----*** DELETE ***------

// Delete existing TripExperience
export function deleteTripExperience(req, res) {
  const { params: params } = req;

  const tripExperience = { TripId: params.tripId, ExperienceId: params.expId };

  // Returns a 200 status and number of deleted tripexperiences upon succes
  _deleteTripExperience(tripExperience)
    .then((numberOfEntriesDeleted) => {
      return res.status(200).json({
        status: true,
        data: {
          numberOfTripExperiencesDeleted: numberOfEntriesDeleted,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}
