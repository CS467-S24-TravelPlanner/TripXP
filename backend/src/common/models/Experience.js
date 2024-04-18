import { Sequelize, DataTypes, Model } from "sequelize";



// export const sequelize = new Sequelize({
//   dialect: "sqlite", // temporarily testing with sqlite3 locally
//   storage: "./common/test_db.db", // temporary test database
// });

export class ExperienceModel extends Model {
  otherPublicField;
}

// Note: Sequelize automatically adds a unique autoincrement ID, if none specified
// ExperienceModel.init(
// {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   latitude: {
//     type: DataTypes.REAL,
//     allowNull: false,
//   },
//   longitude: {
//     type: DataTypes.REAL,
//     allowNull: false,
//   },
//   image_url: {
//     type: DataTypes.STRING,
//   },
//   avg_rating: {
//     type: DataTypes.REAL,
//     allowNull: false,
//   },
// },
//   // { sequelize },
// );

// Initialize the model
// export function initialize(sequelize) {
//   this.model = sequelize.define("experience", ExperienceModel);
// }

// Create new Experience
export function createExperience(experience) {
  return ExperienceModel.create(experience);
}

// Find a specific Experience by ID
export function findExperience(query) {
  return ExperienceModel.findExperience({
    where: query,
  });
}

// Update an existing Experience
export function updateExperience(query, updatedExperience) {
  return ExperienceModel.update(updatedExperience, {
    where: query,
  });
}

// Return all existing Experiences
export function findAllExperiences(query) {
  return ExperienceModel.findAll({
    where: query,
  });
}

// Delete a specific Experience by ID
export function deleteExperience(query) {
  return ExperienceModel.destroy({
    where: query,
  });
}

export default ExperienceModel;