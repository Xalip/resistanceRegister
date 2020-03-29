'use strict'

const express = require("express");
const router = express.Router();
const uuid4 = require("uuid4");

const { uploadFile, getFileStream } = require("../util/attachment");
const { createTestResult, getAllTestResultsForUser } = require("../util/testResult");
const { testResulstStatusEnum } = require("../util/constants");
const user = require("../util/user");

/**
 * Express route for uploading and image to the Google Cloud Sotrage
 * @param {req} req binary stream of the file
 * @param {req.query.userID} userID to which belongs the testResult
 * @param {req.headers.testresult} testResult Enum of the testResult
 */
router.post("/uploadImage", async (req, res) => {
    const userID = req.query.userID;
    const testResult = req.headers.testresult;
    if (await user.checkUserExists(userID)) {
        if (req.body && testResult && testResulstStatusEnum[testResult]) {
            try {
                console.log("Uploading file and creating test result");
                const fileID = uuid4();
                const [imageID, testResultObject] = await Promise.all([uploadFile(fileID, req), createTestResult(userID, testResult, fileID)])
                return res.status(201).send({
                    imageID,
                    testResultID: testResultObject.id
                });
            } catch (err) {
                console.error(new Error(err));
                return res.send(err);
            }
        } else {
            console.log("No file || no test result || not defined testresulst");
            return res.sendStatus(400);
        }
    } else {
        return res.sendStatus(404);
    }
});

/**
 * Express for getting all test results to a given user
 * @param {req.query.userID} userID for which user you want to get all testResulsts
 * @returns array of all testResulsts for a given user
 */
router.get("/all", async (req, res) => {
    const userID = req.query.userID;
    if (userID) {
        try {
            return res.status(200).send(await getAllTestResultsForUser(userID));
        } catch (err) {
            console.error(new Error(err));
            return res.send(err);
        }
    } else {
        console.log("No user");
        return res.sendStatus(400);
    }
});


/**
 * Express for getting all test results to a given user
 * @param {req.query.id} imageID of the testResult
 * @returns binary stream of the picture
 */
router.get("/downloadImage", async (req, res) => {
    const imageID = req.query.id;
    if (imageID) {
        return getFileStream(imageID).pipe(res);
    } else {
        console.log("No ImageID");
        return res.sendStatus(400);
    }
});

module.exports = router;