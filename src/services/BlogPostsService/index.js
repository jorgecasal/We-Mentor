/* eslint-disable no-useless-escape */
import firebase from "../../firebase";

const COLLECTION = "blogposts";
const db = firebase.firestore();
const subscribeToBlogposts = (callback) => {
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

const getBlogposts = async (id) => {
  const  {docs}  = await db.collection(COLLECTION).where("influencerId",  "==", id).get();
  return docs.map(doc=>({
    ...doc.data(),
    id: doc.id
  }));
};

const getBlogpost = async (id, week) => {
  const  {docs}  = await db.collection(COLLECTION).where("influencerId",  "==", id).where("week",  "==", week).get();
  return docs.map(doc=>({
    ...doc.data(),
    id: doc.id
  }));
};

const addNewBlogPost = (influencerId, week, data) => {
  console.log(data)
  return db.collection(COLLECTION).add({
    title: data.title,
    description: data.description,
    url: data.url,
    imageUrl: data.imageUrl,
    influencerId,
    week: Number(week)
  });
};

const updateBlogPost = (id, data) => {
  db.collection(COLLECTION).doc(id).set(data, { merge: true });
};


const deleteBlogPost = (id) => {
  db.collection(COLLECTION).doc(id).delete();
};

export default {
  getBlogpost,
  getBlogposts,
  subscribeToBlogposts,
  addNewBlogPost,
  updateBlogPost,
  deleteBlogPost
};
