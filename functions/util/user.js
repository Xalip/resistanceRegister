const admin = require("firebase-admin")
const bcrypt = require('bcrypt')

async function checkGoogleUserExists(accountID) {
    const collectionUser = admin.firestore().collection("users");
    try {
        const user = await collectionUser.where("googleId", "==", accountID).get();
        let userID = null;
        if (!user.empty) {
            user.docs.forEach(user => userID = user.id);
        }
        return { doesUserExist: !user.empty, id: userID };
    } catch (err) {
        console.error(new Error(err));
        return { doesUserExist: null, err: err }
    }
}

async function checkUserLogin(email, password) {
    return new Promise(async (resolve, reject) => {
        const collectionUser = admin.firestore().collection("users");
        try {
            const user = await collectionUser.where("email", "==", email).get();
            user.forEach(async singleUser => {
                const match = await bcrypt.compare(password, singleUser.data().password);
                if (match) {
                    resolve({ doesUserExist: !user.empty, err: null, id: singleUser.id });
                } else {
                    resolve({ doesUserExist: user.empty, err: null, id: singleUser.id });
                }
            });
        } catch (err) {
            console.error(new Error(err));
            reject(new Error({ doesUserExist: null, err: err }));
        }

    })
}

async function createUser(data) {
    data.createdAt = new Date().toISOString();
    const collectionUser = admin.firestore().collection("users");
    console.log(data.email);
    try {
        if (!(await checkEmailExists(data.email))) {
            const user = await collectionUser.add(data);
            return {
                status: 201,
                id: user.id
            };
        } else {
            return {
                status: 400,
                err: "Email Address already exists!"
            }
        }
    } catch (err) {
        console.error(new Error(err));
        return {
            status: 500,
            err: err
        };
    }
}

async function checkEmailExists(email) {
    const userCollection = admin.firestore().collection("users");
    try {
        const query = await userCollection.where("email", "==", email).get();
        return !query.empty;
    } catch (err) {
        console.error(new Error(err));
        return false;
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
    checkUserExists,
    createUser,
    checkUserLogin
}