const router = require("express").Router();
const Workout = require("../models/workout.js");


router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" }
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
  Workout.distinct("day", Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" },
          
        totalWeight:
          { $sum: "$exercises.weight" }
      },
    }
  ])
  .sort({day: -1})  
  .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    }));
});

// router.get("/api/stats", (req, res) => {
//   Workout.aggregate([
//     { $match: {} },
//     { $sum: { $weight } }
//   ]).then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// })

module.exports = router;
