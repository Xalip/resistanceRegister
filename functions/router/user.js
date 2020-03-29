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
            const userCreation = await user.createUser({
                firstname: userData.givenName,
                lastname: userData.familyName,
                email: userData.email,
                googleId: userData.googleId
            });
            return res.status(userCreation.status).send(userCreation.status === 201 ? userCreation.id : userCreation.err);
        }
    }
});

router.post("/email", async (req, res) => {
    console.info("Incoming request for creating Email User with the following data")
    const userData = req.body
    bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
        if (err) {
            res.sendStatus(500);
        }
        try {
            const userCreation = await user.createUser({
                firstname: null,
                lastname: null,
                email: userData.email,
                password: hash
            });
            res.status(userCreation.status).send(userCreation.status === 201 ? userCreation.id : userCreation.err);
        } catch (err) {
            res.status(500).send(err)
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
    const checkResult = await user.checkUserLogin(req.body.email, req.body.password);
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
});

/**
 * Express for setting details for a given user
 * @param {req.query.userID} userID for which user you want to set the details
 * @returns statuscode
 */
router.get("/details", async (req, res) => {
    const userID = req.query.userID;
    if (userID) {
        if (await user.checkUserExists(userID)) {
            if (!userDetail.err) {
                if (userDetail.data) {
                    return res.send((await user.get(userID)).data);
                } {
                    return res.sendStatus(404);
                }
            } else {
                return res.sendStatus(500);
            }
        }
    } else {
        res.sendStatus(400);
    }
});


/**
 * Express for getting details for a given user
 * @param {req.query.userID} userID for which user you want to get the details
 * @returns object user details
 */
router.get("/details", async (req, res) => {
    const userID = req.query.userID;
    if (userID) {
        const userDetail = await user.get(userID);
        if (!userDetail.err) {
            if (userDetail.data) {
                return res.send((await user.get(userID)).data);
            } {
                return res.sendStatus(404);
            }
        } else {
            return res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;