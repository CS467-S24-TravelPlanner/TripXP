import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

// Routes for Experiences
import ExperienceRoutes from "./experiences/routes.js";

// Routes for Users
import UserRoutes from "./users/routes.js";

// Routes for Trips
import TripRoutes from "./trips/routes.js";

// Routes for Reviews
import ReviewRoutes from "./reviews/routes.js";

import ImageRoutes from "./experiences/imageRoutes.js"

// Sequelize model imports
import { Experience } from "./common/models/Experience.js";
import { User } from "./common/models/User.js";
import { Trip } from "./common/models/Trip.js";
import { TripExperience } from "./common/models/TripExperience.js";
import { Review } from "./common/models/Review.js";

import { Sequelize, Model, DataTypes } from "sequelize";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// utilize express-jwt middleware to valide JWTs
app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
    }),
    audience: process.env.GOOGLE_IDENTITY_CLIENT_ID,
    issuer: "https://accounts.google.com",
    algorithms: ["RS256"],
  }).unless({
    path: ["/", "/experience", "/review", "/experience/imageUpload"],
  })
);

// error handling for express-jwt
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(403).send({
      success: false,
      message: err.message,
    });
  }
  next();
});

// Connect to Production DB
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

// Verify DB Connection
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

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

// Syncing the models that are defined on sequelize with DB tables
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialized");

    // Attaching Routes to the app.
    app.use("/experience", ExperienceRoutes);
    app.use("/user", UserRoutes);
    app.use("/trip", TripRoutes);
    app.use("/review", ReviewRoutes);

    app.use("/imageUpload", ImageRoutes);

    // healthcheck endpoint
    app.get("/", (req, res) => {
      res.status(200).send({ status: "ok" });
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialization threw an error:", err);
  });

export default app;
