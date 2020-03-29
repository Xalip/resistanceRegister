const admin = require("firebase-admin");

async function createTestResult(userID, result, imageID) {
    const collectionTestResults = admin.firestore().collection("testResulst");
    try {
        const testResult = await collectionTestResults.add({
            userID,
            result,
            imageID,
            createdAt: new Date().toISOString() 
        });
        return {
            status: 201,
            id: testResult.id
        };
    } catch (err) {
        console.error(new Error(err));
        return {
            status: 500,
            err: err
        };
    }
}

async function getAllTestResultsForUser(userID) {
    const collectionTestResults = admin.firestore().collection("testResulst");
    const testResulstsQuery = await collectionTestResults.where("userID", "==", userID ).get();
    if (testResulstsQuery.empty) {
        return null;
    }
    const results = [];
    testResulstsQuery.forEach(doc => results.push(doc.data()));
    return results;
}


module.exports = {
    createTestResult,
    getAllTestResultsForUser
}