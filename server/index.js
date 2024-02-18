const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));

app.use(
  cors({
    origin: ["https://authenticationappz.vercel.app", "*"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
