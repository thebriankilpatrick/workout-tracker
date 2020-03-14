const Workout = require("../models/workoutModel");

module.exports = app => {

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
        Workout.find({}).sort({"day": -1}).limit(7).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
};