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
});
// Workout is variable
const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;