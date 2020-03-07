const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Workout type is required"
    },

    name: {
        type: String,
        trim: true,
        required: "Name for this workout is required",
        validate: [({ length }) => length >= 1, "Please type a name for your workout"]
    },

    weight: {
        type: Number,
        trim: true,
        required: "Try to do at least one pound..."
    },

    sets: {
        type: Number,
        trim: true,
        required: "You need to put at least one set"
    },

    reps: {
        type: Number,
        trim: true,
        required: "You need to do at least one rep"
    },

    duration: {
        type: Number,
        trim: true,
        required: "Unless you have a time machine, your workout should take at least one minute."
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;