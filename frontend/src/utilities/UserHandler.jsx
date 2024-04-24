import { postData, getData, patchData, deleteData } from "./ApiService.jsx";

/**
 * createUser adds a new User to the Database.
 * The return value is the response from the server in JSON format.
 * @param {string} username - The username of the new User.
 * @param {string} email - The email address for the new User.
 */
function createUser(username, email) {
  const newUser = {
    username: username,
    email: email,
  };

  return postData("/user", {}, newUser);
}

/**
 * getUsers returns Users matching the search parameters from the Database.
 * The return value is the response from the server in JSON format.
 * @param {JSON} searchParams - The optional search parameters for desired User(s).
 */
function getUsers(searchParams = {}) {
  return getData("/user", searchParams);
}

/**
 * editUser modifies an existing User in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the User being modified.
 * @param {JSON} newData - The key/value pairs being modified.
 */
function editUser(id, newData = {}) {
  const idObj = { id: id };
  const oldUser = getUsers(idObj);

  const newUser = Object.keys(newData).length
    ? { ...idObj, ...newData }
    : oldUser;

  return patchData("/user", newUser);
}

/**
 * deleteUser removes an existing User in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the User being deleted.
 */
function deleteUser(id) {
  return deleteData("/user", { id: id });
}

export { createUser, editUser, getUsers, deleteUser };
