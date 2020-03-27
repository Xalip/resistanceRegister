'use strict'

require("dotenv").config();

const express = require('express');
const app = express();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { loadFirebaseCrediantials } = require("./helper");

admin.initializeApp(loadFirebaseCrediantials());

app.use('/', express.static('public'));
app.use(require("body-parser").json());

app.post('/createUser', async (req, res) => {
    const response = await admin
        .firestore()
        .collection("users")
        .add({
            firstname: "Timmi",
            lastname: "Dobisch",
            address: {
                street: "Klara",
                number: 8
            }
        })
    res.send("success");
});

app.get('/downloadxml', function (req, res) {
    res.send("test");
});


exports.api = functions.https.onRequest(app);