const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const Workout = require("./models/workoutModel");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", ({ body }, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.post("/api/workouts", (req, res) => {

    Workout.create({}).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

app.put("/api/workouts/:id", (req , res) => {

    Workout.findOneAndUpdate( 
    { _id: req.params.id},
    {
        $addToSet: {
            'exercises': {
                type: req.body.type,
                name: req.body.name,
                weight: req.body.weight,
                sets: req.body.sets,
                reps: req.body.reps,
                duration: req.body.duration,
                distance: req.body.distance
            }
        }
    }).then(dbWorkout => {

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    })
});

// Need to get totalDuration! -----------------

app.get(`/api/workouts`, (req , res) => {
    Workout.find().sort({"day": 1}).exec((err, data) => {
        if (err) throw err;

        for (const workout of data) {
            workout.countTotalDuration();
        }
        res.json(data);
    });
});

app.get("/api/workouts/range", (req, res) => {
    // .sort("day: 1").limit(7) ??
    Workout.find({}).sort({"day": 1}).limit(7).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});