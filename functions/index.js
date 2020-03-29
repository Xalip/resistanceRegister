'use strict'

require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors');
const express = require('express');
const app = express();

//Router files
const userRouter = require("./router/user");
const testResultRouter = require("./router/testResult");

const { loadFirebaseCrediantials } = require("./util/helper");

admin.initializeApp(loadFirebaseCrediantials());

app.use(cors({ origin: true }));

app.use("/user", userRouter);
app.use("/testResult", testResultRouter);

exports.api = functions.https.onRequest(app);