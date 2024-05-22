import { Model } from "sequelize";

export class User extends Model {
  otherPublicField;
}

// -----*** CREATE ***------

// Create new User
export function createUser(user) {
  return User.create(user);
}

// -----*** READ ***-----

// Return all existing Users matching given query parameters
export function findAllUsers(query) {
  return User.findAll({
    where: query,
  });
}

// Find a specific User by ID
export function findUser(query) {
  return User.findOne({ where: query });
}

// -----*** UPDATE ***------

// Update an existing User
export function updateUser(query, updatedUser) {
  return User.update(updatedUser, {
    where: query,
  });
}

// -----*** DELETE ***------

// Delete an existing User
export function deleteUser(query) {
  return User.destroy({
    where: query,
  });
}

export default User;
