'use strict'

require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors');
const express = require('express');
const app = express();

//Router files
const userRouter = require("./router/user.js");

const { loadFirebaseCrediantials } = require("./helper");

admin.initializeApp(loadFirebaseCrediantials());

app.use(cors({ origin: true }));

app.use("/user", userRouter);

exports.api = functions.https.onRequest(app);