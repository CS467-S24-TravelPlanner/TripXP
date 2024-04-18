import express from "express";
import cors from "cors";

import helloRoute from "./routes/helloRouter.js";

// Routes for Experience 
import ExperienceRoutes from "./experiences/routes.js";

// Routes for User
import UserRoutes from "./users/routes.js";

// Sequelize model imports
import { Experience } from "./common/models/Experience.js";
import { User } from "./common/models/User.js";

import { Sequelize, Model, DataTypes } from "sequelize";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite", // temporarily testing with sqlite3 locally
  storage: "./src/common/test_db.db", // temporary test database
});


// Initializing the Model on sequelize
// ExperienceModel.inititalize(sequelize)
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
    avg_rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
   { sequelize },
  );

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
     { sequelize },
    );

// Syncing the models that are defined on sequelize with DB tables
sequelize
.sync()
.then(() => {
  console.log("Sequelize Initialized");

  // Attaching Routes to the app.
  app.use("/experience", ExperienceRoutes);
  app.use("/user", UserRoutes);
  app.use("/hello", helloRoute);

   // healthcheck endpoint
  app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});
  
})
.catch((err) => {
  console.error("Sequelize Initialization threw an error:", err);
});

export default app;
