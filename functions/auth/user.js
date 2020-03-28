const admin = require("firebase-admin");

async function checkGoogleUserExists(accountID) {
    const db = admin.firestore().collection("users");
    try {
        const user = await db.doc(accountID).get();
        return user.exists;
    } catch (err) {
        console.error(new Error(err));
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
        console.error(new Error(err));
        return {
            status: 500,
            err: err
        };
    }
}

async function checkUserExists(userID) {
    const userCollection = admin.firestore().collection("users");
    try {
        return (await userCollection.doc(userID).get()).exists
    }catch(err) {
        console.error(new Error(err));
        return false;
    }
}


module.exports = {
    checkGoogleUserExists,
    createUser,
    checkUserExists
}