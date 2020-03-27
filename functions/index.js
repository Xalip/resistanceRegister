'use strict'

require("dotenv").config();

const express = require('express');
const app = express();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors');

const { loadFirebaseCrediantials } = require("./helper");

admin.initializeApp(loadFirebaseCrediantials());

app.use(cors({ origin: true }));
app.use('/', express.static('public'));
app.use(require("body-parser").json());

app.post('/createUser', async (req, res) => {
    const userData = req.body;
    const response = await admin
        .firestore()
        .collection("users")
        .add({
            firstname: userData.givenName,
            lastname: userData.familyName,
            email: userData.email,
            password: userData.password
        })
    res.send("User successfully created");
    console.log(response);
});

app.get('/downloadxml', function (req, res) {
    res.send("test");
});


exports.api = functions.https.onRequest(app);