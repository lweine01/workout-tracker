const router = require("express").Router();
const Workout = require("../models/workout.js");


router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" },
        totalDistance:
          { $sum: "$exercises.distance"}
      }
    }
  ]).then(dbWorkout => {
    res.json(dbWorkout);
  })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" },
          
        totalWeight:
          { $sum: "$exercises.weight" }
      },
    }
  ])
    .then(dbWorkout => {
      const lastSeven = dbWorkout.slice(-7);
      res.json(lastSeven);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
