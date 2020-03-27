const express = require('express');
const app = express();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

//TODO: move to env
const firebaseConfig = {
    apiKey: "AIzaSyCfPIosSU5eg7X5-xF-X-2llyDvam9SKlg",
    authDomain: "resistanceregister.firebaseapp.com",
    databaseURL: "https://resistanceregister.firebaseio.com",
    projectId: "resistanceregister",
    storageBucket: "resistanceregister.appspot.com",
    messagingSenderId: "87921927745",
    appId: "1:87921927745:web:d13d1e18189dceb271c8c0"
};

admin.initializeApp(firebaseConfig);


app.use('/', express.static('public'));
app.use(require("body-parser").json());

app.post('/sendjson', function (req, res) {
    res.status(200).send("test");
});

app.get('/downloadxml', function (req, res) {
    res.send("test");
});


app.listen(8080, () => {
    console.log('App started and available at http://localhost:8080');
});

exports.api = functions.https.onRequest(app);