#!/usr/bin/env node
// app.js, JN, 14.02.2024
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/testdb')

const indexRouter = require('./routes/index');
const apiRoute = require("./routes/api")

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use("/api", apiRoute)

// Enable React build in production environment
if (process.env.NODE_ENV === "production") {
    // Navigate to the build-folder
    app.use(express.static(path.resolve("..", "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("..", "client", "build", "index.html"));
    })
} // Enable CORS on development environment
else if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200
    };
    app.use(cors(corsOptions));
}

module.exports = app;

// eof
