import express from "express";
import http from "http";
import initializeAPI from "./api.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
const limit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: "To many request",
});

// Create the express server
const app = express();
app.use(express.json());
const server = http.createServer(app);
app.use(limit);
// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Initialize the REST api
initializeAPI(app);

//start the web server
const serverPort = process.env.PORT;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
