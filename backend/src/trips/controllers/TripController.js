import {
  findTrip,
  createTrip as _createTrip,
  updateTrip as _updateTrip,
  deleteTrip as _deleteTrip,
  findAllTrips,
} from "./../../common/models/Trip.js";

// -----*** CREATE ***------

// Create a new Trip
export function createTrip(req, res) {
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

  // Returns a 200 status and Success message upon successful creation
  _createTrip(payload)
    .then((model) => {
      return res.status(200).json({
        status: true,
        data: "Successfully created new trip.",
        id: model.id,
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

// Return all Trips in DB matching given parameters. If no parameters are given,
// all trips are returned. If no Trips match given parameters, data is empty.
export function getAllTrips(req, res) {
  findAllTrips(req.query)
    .then((trips) => {
      return res.status(200).json({
        status: true,
        data: trips,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// Find trip by ID
export function getTrip(req, res) {
  findTrip(req.params.tripId)
    .then((trip) => {
      return res.status(200).json({
        status: true,
        data: trip.toJSON(),
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

// Update an existing Trip
export function updateTrip(req, res) {
  const { body: payload } = req;

  const tripId = payload.id;

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

  // Returns a 200 status and Success message upon successful update
  _updateTrip({ id: tripId }, payload)
    .then(() => {
      return res.status(200).json({
        status: true,
        data: "Successfully updated trip.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// -----*** DELETE ***------

// Delete exitisting Trip
export function deleteTrip(req, res) {
  const tripId = req.query.id;

  // Returns a 200 status and number of deleted trips upon succes
  _deleteTrip({ id: tripId })
    .then((numberOfEntriesDeleted) => {
      return res.status(200).json({
        status: true,
        data: {
          numberOfTripsDeleted: numberOfEntriesDeleted,
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
