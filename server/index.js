const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
app.use(cookieParser());
app.use(express.json());
app.use(require("./router/auth"));
app.use(
  cors({
    credentials: true,
  })
);

const PORT = process.env.PORT;

//connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
