const admin = require("firebase-admin");

async function checkGoogleUserExists(accountID) {
    const db = admin.firestore().collection("users");
    try {
        const user = await db.doc(accountID).get();
        return user.exists;
    } catch (err) {
        return "something went wrong"
    }
}

async function createUser(data) {
    const db = admin.firestore().collection("users");
    try {
        const user = await db.add(data);
        return {
            status: 201,
            id: user.id
        };
    } catch (err) {
        console.error(err);
        return {
            status: 500,
            err: err
        };
    }
}


module.exports = {
    checkGoogleUserExists,
    createUser
}