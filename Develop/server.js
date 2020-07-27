const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trackerdb", { useNewUrlParser: true });


app.get("/exercise/new", (req, res) => {
  db.Workout.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

// Let's examine this
app.get("/exercise/continue", (req, res) => {
  db.Workout.find().sort({day:-1}).limit(1)
    .then(dbContinue => {
      res.json(dbContinue);
    })
    .catch(err => {
      res.json(err);
    });
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});