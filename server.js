const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

// const db = require("./seeders");  ????

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethods", { useNewUrlParser: true });

app.get("/exercise", ({ body }, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});