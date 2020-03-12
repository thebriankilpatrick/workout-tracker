const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

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
})

app.put("/api/workouts/:id", (req , res) => {
    console.log(req.params.id);
    Workout.findOneAndUpdate( req.params.id, {
       type: req.body.type,
       name: req.body.name,
       weight: req.body.weight,
       sets: req.body.sets,
       reps: req.body.reps,
       duration: req.body.duration 
    }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    })
});

// Something funky about workouts, and workout duration
app.get(`/api/workouts`, (req , res) => {
    Workout.find().sort({"created_at": -1}).limit(1).exec((err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});