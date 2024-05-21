import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { initDb } from "./db.js";

// Routes for Experiences
import ExperienceRoutes from "./experiences/routes.js";

// Routes for Users
import UserRoutes from "./users/routes.js";

// Routes for Trips
import TripRoutes from "./trips/routes.js";

// Routes for Reviews
import ReviewRoutes from "./reviews/routes.js";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// express-jwt middleware to valide JWTs
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
    path: ["/", "/experience", "/review"],
  })
);

// error handling for express-jwt
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(403).send({
      status: false,
      message: err.message,
    });
  }
  next();
});

// Initialize the database and start the server
initDb()
  .then(() => {
    // Attach routes to the app
    app.use("/experience", ExperienceRoutes);
    app.use("/user", UserRoutes);
    app.use("/trip", TripRoutes);
    app.use("/review", ReviewRoutes);

    // Healthcheck endpoint
    app.get("/", (req, res) => {
      res.status(200).send({ status: "ok" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Sequelize initialization threw an error:", err);
  });

export default app;
