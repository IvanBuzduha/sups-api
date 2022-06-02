const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require('path');
const SuperheroRouter = require("./routes/superhero.js");
const app = express();

app.use(cors());
app.use(express.static('public'))
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use("/", SuperheroRouter);
// app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
