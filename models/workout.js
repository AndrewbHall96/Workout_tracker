const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                unique: true,
                trim: true,
                required: "Enter exercise name"
            },
            type: {
                type: String,
                trim: true,
                required: "Enter the workout type"
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number,
                required: "Enter minutes"
            },
            distance: {
                type: Number
            }
        }
    ]
}, { toJSON: { virtuals: true } }
);
// Create a virtual property `domain` that's computed from `email`.
workOutSchema.virtual('totalDuration').get(function() {
    return this.exercises.reduce((totalMin, exercise) => {
        return totalMin + exercise.duration;
    }, 0);
  })

// Workout is variable
const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;