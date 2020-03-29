'use strict'

const express = require("express");
const router = express.Router();
const user = require("../util/user");

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
            const userCreation = await user.createUser({
                firstname: userData.givenName,
                lastname: userData.familyName,
                email: userData.email,
                googleId: userData.googleId
            });
            res.status(userCreation.status).send(userCreation.status === 201 ? userCreation.id : "something went wrong");
        }
    }
});

router.post("/email", async (req, res) => {
    console.info("Incoming request for creating Email User with the following data");
    const userData = req.body;
    console.log(userData);
    const userCreation = await user.createUser({
        firstname: null,
        lastname: null,
        email: userData.email,
        password: userData.password
    });
    res.status(userCreation.status).send(userCreation.status === 201 ? userCreation.id : "something went wrong");
})


/**
 * Express route for signin
 * @param {req} req contains submitted body with email and password
 */
router.post("/signin", async (req, res) => {
    console.info("Incoming request to login");
    const userData = req.body;
    console.log(userData);
    // check whether user exists in db or not
    const checkResult = await user.checkEmailUserExists(req.body.email, req.body.password);
    if (checkResult.err) {
        return res.status(500).send();
    } else {
        if (checkResult.doesUserExist) {
            return res.status(200).send(checkResult.id);
        } else {
            //TODO: send proper response
            return res.status(403).send("User does not exist. Please register at first.");
        }
    }
})

module.exports = router;