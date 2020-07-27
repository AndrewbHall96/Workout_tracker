const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

const path = require("path");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trackerdb", { useNewUrlParser: true });


app.get("/exercise/new", (req, res) => {
  // db.Workout.find({})
  //   .then(dbExercise => {
      res.sendFile(path.join(__dirname + '/public/exercise.html'));
    });
    // .catch(err => {
    //   res.json(err);
    // });
// });
// db.notes.insert(req.body (err, data) => {
//   if(err) {
//     console.log(err)
//   } else {

//   }
// })
// res.json.body;
// })


app.post("/exercise/new", (req, res) => {
  db.Workout.insert(req.body, (err, data) => {
    if(err) {
      console.log(err)
    } else {

    }
  })
  res.json.body;
});

// Let's examine this
app.get("/exercise/continue", (req, res) => {
  db.Workout.find().sort({day:-1}).limit(1)
    .then(dbContinue => {
      res.sendFile(__dirname + '/public/exercise.html');
    })
    .catch(err => {
      res.json(err);
    });
})

app.post("/exercise/continue", (req, res) => {
  db.Workout.update({_id: req.body._id}, (err, data) => {
    if(err) {
      console.log(err)
    } else {

    }
  })
  res.json.body;
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});