'use strict'

require("dotenv").config();

const express = require('express');
const app = express();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { loadFirebaseCrediantials } = require("./helper");

admin.initializeApp(loadFirebaseCrediantials());

// The app only has access as defined in the Security Rules
var db = admin.database();
var ref = db.ref("/resistentregister");
ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});




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
    res.send(response);
});

app.get('/downloadxml', function (req, res) {
    res.send("test");
});


// app.listen(8080, () => {
//     console.log('App started and available at http://localhost:8080');
// });

exports.api = functions.https.onRequest(app);