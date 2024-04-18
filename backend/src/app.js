import express from "express";
import cors from "cors";

import helloRoute from "./routes/helloRouter.js";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/hello", helloRoute);

export default app;
