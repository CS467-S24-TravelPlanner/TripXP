import http from "http";
import { config } from "dotenv";
import app from "./app.js";

if (process.env.NODE_ENV !== "production") {
  config();
}
const server = http.createServer(app);

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
