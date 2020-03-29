const admin = require("firebase-admin")
const bcrypt = require('bcrypt')

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

async function checkEmailUserExists(email, password) {
    return new Promise(async (resolve, reject) => {
        const collectionUser = admin.firestore().collection("users");

        try {
            const user = await collectionUser.where("email", "==", email).get()
            user.forEach(async singleUser => {
                const match = await bcrypt.compare(password, singleUser.data().password);
                if (match) {
                    resolve({ doesUserExist: !user.empty, err: null });
                } else {
                    resolve({ doesUserExist: user.empty, err: null });
                }
            });
        } catch (err) {
            console.error(new Error(err));
            reject({ doesUserExist: null, err: err });
        }

    })
}

async function createUser(data) {
    data.createdAt = new Date().toISOString();
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

async function checkUserExists(userID) {
    const userCollection = admin.firestore().collection("users");
    try {
        return (await userCollection.doc(userID).get()).exists
    } catch (err) {
        console.error(new Error(err));
        return false;
    }
}


module.exports = {
    checkGoogleUserExists,
    createUser,
    checkUserExists,
    checkEmailUserExists
}