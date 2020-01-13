import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate(async user => {
  try {
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .create({
        uid: user.uid,
        email: user.email,
        displayName: user.email,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoURL
      });

    console.log(`Successfully created user record for user ${user.uid}`);
  } catch (err) {
    console.error(
      `An error occurred creating the user record for user ${user.uid}`,
      err
    );
  }
});

export const addConversation = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    console.error(
      "A non-authenticated attempt was made to add a conversation."
    );
    throw new functions.https.HttpsError(
      "unauthenticated",
      "This is a protected route. Please log in and try again."
    );
  }

  if (!data?.email) {
    console.error(
      "An attempt was made to add a conversation without another user."
    );
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No email was supplied to start a conversation with. Please provide an email and try again."
    );
  }

  const userRecord = await admin
    .firestore()
    .collection("users")
    .where("email", "==", data.email)
    .get();

  if (!userRecord || userRecord.empty) {
    console.error(
      "An attempt was made to add a conversation with a non-existent user."
    );
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The specified user does not have an account. Please ask them to sign up and try again."
    );
  }

  const userId = userRecord.docs[0].id;

  if (context.auth.uid === userId) {
    console.error(
      "An attempt was made to add a conversation with the current user."
    );
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A conversation cannot be started with yourself. Please specify another user and try again."
    );
  }

  let existingConversations: admin.firestore.QueryDocumentSnapshot[];
  try {
    const conversations = await admin
      .firestore()
      .collection("conversations")
      .where("users", "array-contains", context.auth.uid)
      .get();

    existingConversations = conversations.docs.filter(d => {
      const docData = d.data();
      return docData.users.length === 2 && docData.users.includes(userId);
    });
  } catch (err) {
    console.error(
      "An error occurred checking if the conversation already exists.",
      err
    );
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred checking if the conversation already exists. Please try again later."
    );
  }

  if (existingConversations.length > 0) {
    console.error(
      "An attempt was made to add a conversation that already exists."
    );
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A conversation cannot be started more than once. Please find the conversation in your conversation list."
    );
  }

  let docId: string;
  try {
    const doc = await admin
      .firestore()
      .collection("conversations")
      .add({
        users: [context.auth.uid, userId]
      });
    docId = doc.id;
  } catch (err) {
    console.error("An error occurred creating the conversation.", err);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred creating the conversation. Please try again later."
    );
  }

  return {
    docId
  };
});
