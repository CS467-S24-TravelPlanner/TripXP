import { Model } from "sequelize";


export class Experience extends Model {
  otherPublicField;
}

// Create new Experience
export function createExperience(experience) {
  return Experience.create(experience);
}

// Find a specific Experience by ID
export function findExperience(query) {
  return Experience.findExperience({
    where: query,
  });
}

// Update an existing Experience
export function updateExperience(query, updatedExperience) {
  return Experience.update(updatedExperience, {
    where: query,
  });
}

// Return all existing Experiences
export function findAllExperiences(query) {
  return Experience.findAll({
    where: query,
  });
}

// Delete a specific Experience by ID
export function deleteExperience(query) {
  return Experience.destroy({
    where: query,
  });
}

export default Experience;