/* eslint-disable no-useless-escape */
import firebase from "../../firebase";

const COLLECTION = "influencers";
const db = firebase.firestore();
const subscribeToBloggersList = (callback) => {
  // returns an unsubscribe function for cleanup
  return db.collection(COLLECTION).onSnapshot({
    next: (querySnapshot) => {
      callback &&
        callback(
          null,
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
    },
    error: () => {
      const msg = "Error getting bloggers list";
      callback && callback(new Error(msg));
    },
  });
};

const getBloggersList = async () => {
  const { docs } = await db.collection(COLLECTION).get();
  return docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const addNewBlogger = (bloggerName) => {
  return db.collection(COLLECTION).add({
    name: bloggerName,
    categories: [],
  });
};

const getBloggerData = async (id) => {
  const data = (await db.collection(COLLECTION).doc(id).get()).data();
  return { name: data.name, checked: data.categories };
};
const updateBloggerData = (id, name, checked) => {
  const data = { name, categories: checked };
  db.collection(COLLECTION).doc(id).set(data, { merge: true });
};

const flagDeleted = (id, deleted = true) =>
  db.collection(COLLECTION).doc(id).set(
    {
      deleted,
    },
    {
      merge: true,
    }
  );

const deleteBlogger = (id) => {
  db.collection(COLLECTION).doc(id).delete();
};

export default {
  getBloggersList,
  subscribeToBloggersList,
  addNewBlogger,
  getBloggerData,
  updateBloggerData,
  flagDeleted,
  deleteBlogger,
};
