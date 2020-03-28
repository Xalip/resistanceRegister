'use strict'

const express = require("express");
const router = express.Router();

router.post('/createUser', async (req, res) => {
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

module.exports = router;