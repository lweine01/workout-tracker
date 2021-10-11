const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: "Must include type of exercise"
            },
            name: {
                type: String,
                required: "Must include name of exercise"
            },
            duration: {
                type: Number,
                required: "Must include duration of exercise"
            },
            weight: Number,
            reps: Number,
            sets: Number
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
