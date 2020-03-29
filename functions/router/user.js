'use strict'

const express = require("express")
const router = express.Router()
const user = require("../util/user")
const bcrypt = require('bcrypt')
const saltRounds = 10


router.post("/google", async (req, res) => {
    console.info("Incoming request for creating Google User with the following data");
    const userData = req.body;
    // check here whether user exists in db or not
    const checkResult = await user.checkGoogleUserExists(req.body.googleId);
    if (checkResult.err) {
        return res.status(500).send();
    } else {
        if (checkResult.doesUserExist) {
            return res.status(200).send(checkResult.id);
        } else {
            const response = await user.createUser({
                firstname: userData.givenName,
                lastname: userData.familyName,
                email: userData.email,
                googleId: userData.googleId
            });
            //TODO: send proper response
            return res.status(201).send("User successfully created");
        }
    }
});

router.post("/email", async (req, res) => {
    console.info("Incoming request for creating Email User with the following data")
    const userData = req.body
    console.log("Passwort: ", userData.password)
    bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
        // Store hash in your password DB.
        console.log("Current Hash: ", hash)
        try {
            const response = await user.createUser({
                firstname: null,
                lastname: null,
                email: userData.email,
                password: hash
            })
            res.status(response.status).send(response.id)
        } catch (err) {
            res.status(response.status).send(err)
        }
    })
})


/**
 * Express route for signin
 * @param {req} req contains submitted body with email and password
 */
router.post("/signin", async (req, res) => {
    console.info("Incoming request to login");
    // check whether user exists in db or not
    const checkResult = await user.checkEmailUserExists(req.body.email, req.body.password);
    if (checkResult.err) {
        return res.status(500).send();
    } else {
        if (checkResult.doesUserExist) {
            return res.status(202).send();
        } else {
            //TODO: send proper response
            return res.status(403).send("User does not exist. Please register at first.");
        }
    }
})

module.exports = router;