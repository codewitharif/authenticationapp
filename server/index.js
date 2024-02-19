const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cookieParser());

// Define an environment variable to indicate whether the server is running in production
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: [
      "https://authenticationappz.vercel.app",
      "http://localhost:5173",
      "*",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to set secure flag for cookies in production
if (isProduction) {
  app.use((req, res, next) => {
    // Check if the request is made over HTTPS
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      // If yes, set the secure flag for cookies
      res.setHeader("Set-Cookie", "SameSite=None; Secure");
    }
    // Continue to the next middleware
    next();
  });
}

app.use(express.json());
app.use(require("./router/auth"));

const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
