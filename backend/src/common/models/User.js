import { Model } from "sequelize";


export class User extends Model {
  otherPublicField;
}

// Create new User
export function createUser(user) {
  return User.create(user);
}

// Find a specific User by ID
export function findUser(userId) {
  return User.findByPk(userId);
}

// Update an existing User
export function updateUser(query, updatedUser) {
  return User.update(updatedUser, {
    where: query,
  });
}

// Return all existing Users
export function findAllUsers(query) {
  return User.findAll({
    where: query,
  });
}

// Delete a specific User by ID
export function deleteUser(query) {
  return User.destroy({
    where: query,
  });
}

export default User;