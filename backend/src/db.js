// Sequelize model imports
import { Experience } from "./common/models/Experience.js";
import { User } from "./common/models/User.js";
import { Trip } from "./common/models/Trip.js";
import { TripExperience } from "./common/models/TripExperience.js";
import { Review } from "./common/models/Review.js";

import { Sequelize, DataTypes } from "sequelize";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

// Connect to Production DB
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

// Initializing the Models on sequelize
Experience.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    keywords: {
      type: DataTypes.JSON,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

User.init(
  {
    jwt_unique: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize }
);

Trip.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

TripExperience.init(
  {
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ExperienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);

Review.init(
  {
    experience_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  { sequelize }
);

// Set the Many-to-Many relationship for Models.
Experience.belongsToMany(Trip, { through: "TripExperience" });
Trip.belongsToMany(Experience, { through: "TripExperience" });

// Connection and sync models with the database
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("Sequelize models have been synced with the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export { sequelize, initDb, Experience, User, Trip, TripExperience, Review };
