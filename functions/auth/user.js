const admin = require("firebase-admin");

async function checkGoogleUserExists(accountID) {
    const collectionUser = admin.firestore().collection("users");
    try {
        const user = await collectionUser.where("googleId", "==", accountID).get();
        return { doesUserExist: !user.empty };
    } catch (err) {
        console.error(new Error(err));
        return { doesUserExist: null, err: err }
    }
}

async function createUser(data) {
    const collectionUser = admin.firestore().collection("users");
    try {
        const user = await collectionUser.add(data);
        return {
            status: 201,
            id: user.id
        };
    } catch (err) {
        console.error(new Error(err));
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