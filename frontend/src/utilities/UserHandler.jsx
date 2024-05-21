import { getData, patchData, deleteData } from "./ApiService.jsx";

/**
 * getUser returns the user based on the auth_token provided
 * The return value is the response from the server in JSON format.
 * @param {string} auth_token - The full JWT for authorization.
 */
function getUser(auth_token) {
  return getData("/user", {}, auth_token);
}

// NOTE: not currently implemented (no admin role)
// /**
//  * getUsers returns Users matching the search parameters from the Database.
//  * The return value is the response from the server in JSON format.
//  * @param {JSON} searchParams - The optional search parameters for desired User(s).
//  * @param {string} auth_token - The full JWT for authorization.
//  */
// function getUsers(searchParams = {}, auth_token) {
//   return getData("/user", searchParams, auth_token);
// }

/**
 * editUser modifies an existing User in the Database.
 * The return value is the response from the server in JSON format.
 * @param {JSON} newData - The key/value pairs being modified.
 * @param {string} auth_token - The full JWT for authorization.
 */
function editUser(newData, auth_token) {
  return patchData("/user", newData, auth_token);
}

/**
 * deleteUser removes an existing User in the Database.
 * The return value is the response from the server in JSON format.
 * @param {string} auth_token - The full JWT for authorization.
 */
function deleteUser(auth_token) {
  return deleteData("/user", {}, auth_token);
}

export { editUser, getUser, deleteUser };
