const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now
    },

    totalDuration: {
        type: Number
    },

    exercises: [{
        type: {
            type: String,
            trim: true,
        },
    
        name: {
            type: String,
            trim: true,
        },
    
        distance: {
            type: Number,
            trim: true
        },
    
        weight: {
            type: Number,
            trim: true,
        },
    
        sets: {
            type: Number,
            trim: true,
        },
    
        reps: {
            type: Number,
            trim: true,
        },
    
        duration: {
            type: Number,
            trim: true,
        }
    }]
});

WorkoutSchema.methods.countTotalDuration = function() {
    let total = 0;
    for (i = 0; i < this.exercises.length; i++) {
        total += this.exercises[i].duration;
    }
    this.totalDuration = total;
}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;