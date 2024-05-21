import {
  createTripExperience as _createTripExperience,
  deleteTripExperience as _deleteTripExperience,
  findAllTripExperiences,
} from "./../../common/models/TripExperience.js";
import { findTrip } from "../../common/models/Trip.js";

// -----*** CREATE ***------

// Create a new TripExperience
export async function createTripExperience(req, res) {
  const { params } = req;

  // Return Error if incorrect parameters provided
  if (Object.keys(params).length !== 2) {
    return res.status(400).json({
      status: false,
      error: {
        message:
          "Trip ID and Experience ID must be given as parameters in request URI.",
      },
    });
  }

  const tripExperience = { TripId: params.tripId, ExperienceId: params.expId };

  try {
    const trip = await findTrip(params.tripId);
    if (trip.user_id !== req.user.dataValues.id) {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }

    await _createTripExperience(tripExperience);
    return res.status(200).json({
      status: true,
      data: "Successfully added Experience to Trip.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** READ ***------

// Return all TripExperiences in DB matching given parameters. If no parameters are given,
// all tripexperiences are returned. If no TripExperiences match given parameters, data is empty.
export async function getAllTripExperiences(req, res) {
  const { params } = req;

  try {
    const trip = await findTrip(params.tripId);
    if (trip.user_id !== req.user.dataValues.id) {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }

    const tripexperiences = await findAllTripExperiences({
      TripId: params.tripId,
    });
    return res.status(200).json({
      status: true,
      data: tripexperiences,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** DELETE ***------

// Delete existing TripExperience
export async function deleteTripExperience(req, res) {
  const { params } = req;

  const tripExperience = { TripId: params.tripId, ExperienceId: params.expId };

  try {
    const trip = await findTrip(params.tripId);
    if (trip.user_id !== req.user.dataValues.id) {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }

    const numberOfEntriesDeleted = await _deleteTripExperience(tripExperience);
    return res.status(200).json({
      status: true,
      data: {
        numberOfTripExperiencesDeleted: numberOfEntriesDeleted,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}
