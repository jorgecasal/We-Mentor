/* eslint-disable no-useless-escape */
import firebase from "../../firebase";

const COLLECTION = "faq";
const db = firebase.firestore();

const subscribeToQuestionList = (callback) => {
  // returns an unsubscribe function for cleanup
  return db.collection(COLLECTION).onSnapshot({
    next: (querySnapshot) => {
      callback &&
        callback(
          null,
          querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
    },
    error: () => {
      const msg = "Error getting questions list";
      callback && callback(new Error(msg));
    },
  });
};

const getQuestions = async () => {
  const { docs } = await db.collection(COLLECTION).get();
  return docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getQuestionRef = async (id) => {
  return await db.collection(COLLECTION).doc(id)
}
const getQuestion = async (id) => {

  const docs = (await db.collection(COLLECTION).doc(id).get()).data();
  return docs;
};

const addNewQuestion = (data) => {
  return db.collection(COLLECTION).add(data);
};

const updateQuestion = (id, data) => {
  db.collection(COLLECTION).doc(id).set(
    data,
    { merge: true }
  );
};

const deleteQ = (id) => {
  db.collection(COLLECTION).doc(id).delete();
};

export default {
  getQuestions,
  getQuestion,
  subscribeToQuestionList,
  addNewQuestion,
  deleteQ,
  updateQuestion,
  getQuestionRef
};
