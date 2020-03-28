'use strict'

const admin = require("firebase-admin");
const functions = require("firebase-functions");

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
async function uploadFile(id, file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }

        const bucket = admin.storage().bucket(functions.config().backend.storagebucket);
        const fileUpload = bucket.file(id);

        // Create WriteStream
        const uploadStream = fileUpload.createWriteStream({
            metadata: {
                contentType: 'image/pdf'
            }
        });

        // Observe error
        uploadStream.on('error', (error) => {
            console.error(error);
            reject("Something is wrong! Unable to upload at the moment.");
        });

        // Upload finished
        uploadStream.on('finish', () => {
            resolve(id)
        });

        uploadStream.end(file.body);
    });
}


module.exports = {
    uploadFile
}





