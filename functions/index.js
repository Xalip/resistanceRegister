'use strict'

require("dotenv").config();
const express = require('express');
const app = express();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors');

//Router files
const userRouter = require("./router/user.js");

const { loadFirebaseCrediantials } = require("./helper");

admin.initializeApp(loadFirebaseCrediantials());

app.use(cors({ origin: true }));
app.use('/', express.static('public'));
app.use(require("body-parser").json());

app.use("/user", userRouter);

exports.api = functions.https.onRequest(app);