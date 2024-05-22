import {
  findTrip,
  createTrip as _createTrip,
  updateTrip as _updateTrip,
  deleteTrip as _deleteTrip,
  findAllTrips,
} from "./../../common/models/Trip.js";

// -----*** CREATE ***------

// Create a new Trip
export async function createTrip(req, res) {
  const { body: payload } = req;

  // Return Error if no Payload provided
  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Body is empty, can't create the trip.",
      },
    });
  }

  payload["user_id"] = req.user.dataValues.id;

  try {
    const model = await _createTrip(payload);
    return res.status(200).json({
      status: true,
      data: "Successfully created new trip.",
      id: model.id,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** READ ***------

// Return all Trips in DB matching given parameters. If no parameters are given,
// all trips are returned. If no Trips match given parameters, data is empty.
export async function getAllTrips(req, res) {
  try {
    const trips = await findAllTrips({
      ...req.query,
      user_id: req.user.dataValues.id,
    });
    return res.status(200).json({
      status: true,
      data: trips,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// Find trip by ID
export async function getTrip(req, res) {
  try {
    const trip = await findTrip(req.params.tripId);
    if (trip.user_id == req.user.dataValues.id) {
      return res.status(200).json({
        status: true,
        data: trip.toJSON(),
      });
    } else {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** UPDATE ***------

// Update an existing Trip
export async function updateTrip(req, res) {
  const { body: payload } = req;

  // If the payload does not have any keys,
  // Return an error, as nothing can be updated
  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Body is empty, can't update the trip.",
      },
    });
  }

  try {
    // Verify that the trip to be updated is owned by the user, else 403
    const trip = await findTrip(req.params.tripId);
    if (trip.user_id != req.user.dataValues.id) {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }

    // Update the trip
    await _updateTrip({ id: req.params.tripId }, payload);
    return res.status(200).json({
      status: true,
      data: "Successfully updated trip.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** DELETE ***------

// Delete exitisting Trip
export async function deleteTrip(req, res) {
  try {
    const trip = await findTrip(req.params.tripId);
    if (trip.user_id != req.user.dataValues.id) {
      return res.status(403).json({
        status: false,
        error: {
          message: "This trip doesn't belong to you.",
        },
      });
    }

    const numberOfEntriesDeleted = await _deleteTrip({ id: req.params.tripId });
    return res.status(200).json({
      success: true,
      data: {
        numberOfTripsDeleted: numberOfEntriesDeleted,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}
