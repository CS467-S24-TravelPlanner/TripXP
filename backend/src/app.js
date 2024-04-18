import express from "express";
import cors from "cors";

import helloRoute from "./routes/helloRouter.js";

// Routes for Experience 
import ExperienceRoutes from "./experiences/routes.js";

// Sequelize model imports
import { ExperienceModel } from "./common/models/Experience.js";

import { Sequelize, Model, DataTypes } from "sequelize";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// Allow port to be set automatically
const PORT = process.env.PORT;

const sequelize = new Sequelize({
  dialect: "sqlite", // temporarily testing with sqlite3 locally
  storage: "./src/common/test_db.db", // temporary test database
});


// Initializing the Model on sequelize
// ExperienceModel.inititalize(sequelize)
ExperienceModel.init(
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

// Syncing the models that are defined on sequelize with DB tables
sequelize
.sync()
.then(() => {
  console.log("Sequelize Initialized");

  // Attaching Routes to the app.
  app.use("/experience", ExperienceRoutes);
  app.use("/hello", helloRoute);

  app.listen(PORT, () => {
      console.log('Server listening on port:', PORT);
  });

   // healthcheck endpoint
  app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});
  
})
.catch((err) => {
  console.error("Sequelize Initialization threw an error:", err);
});

export default app;
