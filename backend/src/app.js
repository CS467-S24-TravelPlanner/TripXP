import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { initDb } from "./db.js";
import { config } from "dotenv";

// Routes for Experiences
import ExperienceRoutes from "./experiences/routes.js";

// Routes for Users
import UserRoutes from "./users/routes.js";

// Routes for Trips
import TripRoutes from "./trips/routes.js";

// Routes for Reviews
import ReviewRoutes from "./reviews/routes.js";

// Routes for Uploads
import UploadRoutes from "./uploadRoutes.js";

import userMiddleware from "./middleware/userMiddleware.js";
if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();

// parse json request body
app.use(express.json());

// Enable CORS with specific options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// enable cors
app.use(cors(corsOptions));

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
    credentialsRequired: false,
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
    // Middleware requiring DB
    app.use(userMiddleware);

    // Attach routes to the app
    app.use("/experience", ExperienceRoutes);
    app.use("/user", UserRoutes);
    app.use("/trip", TripRoutes);
    app.use("/review", ReviewRoutes);
    app.use("/", UploadRoutes);

    // healthcheck endpoint
    app.get("/", (req, res) => {
      res.status(200).send({ status: "ok" });
    });
  })
  .catch((err) => {
    console.error("Can't connect to /upload:", err);
  });

export default app;
