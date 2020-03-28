'use strict'

const express = require("express");
const router = express.Router();
const user = require("../auth/user");
const { uploadFile } = require("../util/attachment");
const uuid4 = require('uuid4');

router.post("/google", async (req, res) => {
    console.info("Incoming request for creating Google User with the following data");
    const userData = req.body;
    // check here whether user exists in db or not
    const checkResult = await user.checkGoogleUserExists(req.body.googleId);
    if (checkResult.err) {
        return res.status(500).send();
    } else {
        if (checkResult.doesUserExist) {
            return res.status(204);
        } else {
            const response = await user.createUser({
                firstname: userData.givenName,
                lastname: userData.familyName,
                email: userData.email,
                googleId: userData.googleId
            });
            //TODO: send proper response
            return res.status(204).send("User successfully created");
            console.log(response);
        }
    }
});

router.post("/email", async (req, res) => {
    console.info("Incoming request for creating Email User with the following data");
    const userData = req.body;
    console.log(userData);
    const response = await user.createUser({
        firstname: null,
        lastname: null,
        email: userData.email,
        password: userData.password
    });
    res.status(response.status).send(response.status === 201 ? response.id : "something went wrong");
})

router.post("/uploadResult", async (req, res) => {
    const userID = req.query.userID;
    if (await user.checkUserExists(userID)) {
        //FIXME: if
        if (req) {
            try {
                console.log("Uploading file...");
                //TODO: Promise all insert database entry
                const fileID = uuid4();
                const result = await uploadFile(fileID, req);
                return res.status(201).send(result);
            } catch (err) {
                console.error(new Error(err));
                return res.send(err);
            }
        } else {
            console.log("No file...");
            return res.sendStatus(400);
        }
    } else {
        return res.sendStatus(404);
    }
});

    const checkResult = await user.checkGoogleUserExists(req.query.id);
    return res.status(typeof checkResult === "string" ? 200 : 500).send(typeof checkResult === "string" ? "something went wrong" : checkResult);
})

module.exports = router;