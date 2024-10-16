const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const taskRoute = require("./routes/TaskRoutes");

//Middlewares:
app.use(express.json());
app.use(cors());

//Base Route:
app.use("/api/tasks", taskRoute);

//DB connection:
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected successfully & Listing to " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
