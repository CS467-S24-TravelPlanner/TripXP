import { Model } from "sequelize";

export class Experience extends Model {
  otherPublicField;
}

// -----*** CREATE ***------

// Create new Experience
export function createExperience(experience) {
  return Experience.create(experience);
}

// -----*** READ ***------

// Return all existing Experiences matching given query parameters
export function findAllExperiences(query) {
  return Experience.findAll({
    where: query,
  });
}

// Find a specific Experience by ID
export function findExperience(experienceId) {
  return Experience.findByPk(experienceId);
}

// -----*** UPDATE ***------

// Update an existing Experience
export function updateExperience(query, updatedExperience) {
  return Experience.update(updatedExperience, {
    where: query,
  });
}

// -----*** DELETE ***------

// Delete an existing Experience
export function deleteExperience(query) {
  return Experience.destroy({
    where: query,
  });
}

export default Experience;
