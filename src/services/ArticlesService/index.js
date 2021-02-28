import firebase from "../../firebase";

const COLLECTION = "articles";
const db = firebase.firestore();
const subscribeToArticles = callback => {
  // returns an unsubscribe function for cleanup
  return db.collection(COLLECTION).onSnapshot({
    next: querySnapshot => {
      callback &&
        callback(
          null,
          querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
        );
    },
    error: () => {
      const msg = "Error getting articles list";
      callback && callback(new Error(msg));
    }
  });
};

const getAllArticles = async () => {
  const { docs } = await db
    .collection(COLLECTION)
    .get();
  return docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
};

const getArticles = async id => {
  const { docs } = await db
    .collection(COLLECTION)
    .where("categoryId", "==", id)
    .get();
  return docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
};

const getArticle = async articleId => {
  const data = await db
    .collection(COLLECTION)
    .doc(articleId)
    .get();
  return data.data();
};

const addNewArticle = data => {
  return db.collection(COLLECTION).add({
    title: data.title,
    imageUrl: data.imageUrl,
    intro: data.intro,
    body: data.body,
    verifiedBy: data.verifiedBy,
    categoryId: data.categoryId
  });
};

const addOfferIdToArticle = (id, data) => {
  db.collection(COLLECTION).doc(id).set(data, {merge: true})
}

const updateArticle = (id, data) => {
  db.collection(COLLECTION)
    .doc(id)
    .set(
      {...data
      },
      { merge: true }
    );
};

const deleteArticle = id => {
  db.collection(COLLECTION)
    .doc(id)
    .delete();
};

const flagDeleted = (id, deleted = true) => {
  db.collection(COLLECTION)
    .doc(id)
    .set(
      {
        deleted
      },
      {
        merge: true
      }
    );
};

export default {
  getArticle,
  getArticles,
  subscribeToArticles,
  addNewArticle,
  deleteArticle,
  flagDeleted,
  updateArticle,
  addOfferIdToArticle,
  getAllArticles
};
