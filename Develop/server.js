const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const db = require("./models");

const app = express();

const path = require("path");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trackerdb", { useNewUrlParser: true });


app.get("/exercise", (req, res) => {
  // db.Workout.find({})
  //   .then(dbExercise => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
});

app.get("/stats", (req, res) => {
  // db.Workout.find({})
  //   .then(dbExercise => {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().sort({ day: -1 }).limit(7)
    .then(dbContinue => {
      // total duration and attach to object. Pull in total durations  from the week. Will need a loop. Console.log (dbcontinue) to start.
      res.json(dbContinue);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
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

// need a stats route.  Double check
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//HTML route
app.get("/api/workouts", (req, res) => {
  db.Workout.find().sort({ day: -1 })
    .then(dbContinue => {
      // total duration and attach to object. Pull in total durations  from the week. Will need a loop. Console.log (dbcontinue) to start.
      res.json(dbContinue);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
// get total d
  // DB.workout.find. with id that is given to us through the request/ We WIll pull the workout plan from the db and have it in a .then. dbContinue. dbContinue. exercises.append(appen infor below in to the arrray) Then update with id, but pass in the workout plan (dbContinue).
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      weight: req.body.weight,
      sets: req.body.sets,
      duration: req.body.duration,
      distance: req.body.distance
    }
    )
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  });

// app.get("/api/workouts", (req, res) => {
//   console.log(req.body);

//   db.Workout.find()
//     .then(dbContinue => {
//       res.json(dbContinue);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// })

//API Route
// app.post("/api/workouts", (req, res) => {
//   console.log(req.body);

//   db.notes.insert(req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json(data);
//     }
//   });
// });

// need an api/workouts/range
// Stats page is looking for this. In front end JS. Will  return back the 7 days of workout. Check 116 and  limit 7
// HTML ROUTE
app.get("/api/workouts/:id", (req, res) => {
  db.Workout.find().sort({ day: -1 }).limit(1)
    .then(dbContinue => {
      res.json(dbContinue);
    })
    .catch(err => {
      res.json(err);
    });
})

// API Route. Dont need this:
// app.post("/exercise/continue", (req, res) => {
//   db.Workout.update({ _id: req.body._id }, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {

//     }
//   })
//   res.json.body;
// });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});