'use strict'

const admin = require("firebase-admin");
const functions = require("firebase-functions");

/**
 * Upload the image file to Google Storage
 * @param {File} req object that will be uploaded to Google Storage
 * @param {id} id under which the image will be saved
 */
async function uploadFile(id, req) {
    return new Promise((resolve, reject) => {
        if (!req) {
            reject(new Error('No image file'));
        }

        const bucket = admin.storage().bucket(functions.config().backend.storagebucket);
        const fileUpload = bucket.file(id);

        // Create WriteStream
        const uploadStream = fileUpload.createWriteStream({
            metadata: {
                contentType: req.headers["content-type"]
            }
        });

        // Observe error
        uploadStream.on('error', (error) => {
            console.error(error);
            reject(new Error("Something is wrong! Unable to upload at the moment."));
        });

        // Upload finished
        uploadStream.on('finish', () => {
            resolve(id)
        });

        uploadStream.end(req.body);
    });
}

function getFileStream(imageID) {
    const bucket = admin.storage().bucket(functions.config().backend.storagebucket);
    return bucket.file(imageID).createReadStream();
}

module.exports = {
    uploadFile,
    getFileStream
}





