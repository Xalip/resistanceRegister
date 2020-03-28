'use strict'

const admin = require("firebase-admin");
const functions = require('firebase-functions');

function loadFirebaseCrediantials() {
    return {
        credential: admin.credential.cert(loadServiceAccount()),
        apiKey: functions.config().backend.apikey,
        authDomain: functions.config().backend.authdomain,
        databaseURL: functions.config().backend.databaseurl,
        projectId: functions.config().backend.projectid,
        storageBucket: functions.config().backend.storagebucket,
        messagingSenderId: functions.config().backend.messagingsenderid,
        appId: functions.config().backend.appid
    }
}

function loadServiceAccount() {
    return {
        type: functions.config().backend.type,
        project_id: functions.config().backend.project_id,
        private_key_id: functions.config().backend.private_key_id,
        private_key: Buffer.from(functions.config().backend.private_key, 'base64').toString("ascii"),
        client_email: functions.config().backend.client_email,
        client_id: functions.config().backend.client_id,
        auth_uri: functions.config().backend.auth_uri,
        token_uri: functions.config().backend.token_uri,
        auth_provider_x509_cert_url: functions.config().backend.auth_provider_x509_cert_url,
        client_x509_cert_url: functions.config().backend.client_x509_cert_url
    }
}
module.exports = {
    loadFirebaseCrediantials
}