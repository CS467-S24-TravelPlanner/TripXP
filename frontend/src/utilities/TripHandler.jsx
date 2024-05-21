import { postData, getData, patchData, deleteData } from "./ApiService.jsx";

/**
 * createTrip adds a new Trip to the Database.
 * The return value is the response from the server in JSON format.
 * @param {string} name - The name of the new Trip.
 * @param {string} description - The description of the new Trip.
 * @param {string} auth_token - The full JWT for authorization.
 */
function createTrip(name, description, auth_token) {
  const newTrip = { name, description };

  return postData("/trip", {}, newTrip, auth_token);
}

/**
 * addExperienceToTrip adds a new Experience to an existing Trip in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} tripId - The ID of the Trip.
 * @param {number} experienceId - An ID of the Experience being added to the Trip.
 * @param {string} auth_token - The full JWT for authorization.
 */
function addExperienceToTrip(tripId, experienceId, auth_token) {
  return postData(
    "/trip/" + tripId + "/experience/" + experienceId,
    {},
    {},
    auth_token
  );
}

/**
 * getTrip returns the trip matching the given ID from the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} tripId - The ID of the Trip.
 * @param {string} auth_token - The full JWT for authorization.
 */
function getTrip(tripId, auth_token) {
  return getData("/trip/" + tripId, {}, auth_token);
}

/**
 * getTrips returns Trips matching the search parameters from the Database.
 * The return value is the response from the server in JSON format.
 * @param {JSON} searchParams - The optional search parameters for desired Trip(s).
 * @param {string} auth_token - The full JWT for authorization.
 */
function getTrips(searchParams = {}, auth_token) {
  return getData("/trip", searchParams, auth_token);
}

/**
 * getTripExperiences returns Experiences belonging to a Trip from the Database.
 * The return value is an Array of Experience objects.
 * @param {number} tripId - The ID of the Trip whose Experiences will be returned.
 * @param {string} auth_token - The full JWT for authorization.
 */
async function getTripExperiences(tripId, auth_token) {
  let experiences = await getData(
    "/trip/" + tripId + "/experience",
    {},
    auth_token
  );
  return experiences;
}

/**
 * editTrip modifies an existing Trip in the Database. This is used to change a Trip's
 * name or description, not to add/remove Experiences from a Trip.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Trip being modified.
 * @param {JSON} newData - The key/value pairs being modified.
 * @param {string} auth_token - The full JWT for authorization.
 */
function editTrip(id, newData = {}, auth_token) {
  const oldTrip = getTrip(id, auth_token);

  // TODO more security likely needed here to ensure id can't be overwritten
  const newTrip = Object.keys(newData).length
    ? { ...oldTrip, ...newData }
    : oldTrip;

  return patchData("/trip", newTrip, auth_token);
}

/**
 * deleteTrip removes an existing Trip in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Trip being deleted.
 * @param {string} auth_token - The full JWT for authorization.
 */
function deleteTrip(id, auth_token) {
  return deleteData("/trip", { id }, auth_token);
}

/**
 * removeExperienceFromTrip removes an Experience to from an existing Trip in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} tripId - The ID of the Trip.
 * @param {number} experienceId - An ID of the Experience being removed from the Trip.
 * @param {string} auth_token - The full JWT for authorization.
 */
function removeExperienceFromTrip(tripId, experienceId, auth_token) {
  return deleteData(
    "/trip/" + tripId + "/experience/" + experienceId,
    {},
    auth_token
  );
}

export {
  createTrip,
  addExperienceToTrip,
  editTrip,
  getTrip,
  getTrips,
  getTripExperiences,
  deleteTrip,
  removeExperienceFromTrip,
};
