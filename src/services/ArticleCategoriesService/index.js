
/* eslint-disable no-useless-escape */
import firebase from "../../firebase";


const COLLECTION = "articleCategories";
const db = firebase.firestore();

const subscribeToArticleCategoriesList = (callback) => {
  // returns an unsubscribe function for cleanup
  return db.collection(COLLECTION).onSnapshot({
    next: (querySnapshot) => {
      callback &&
        callback(
          null,
          querySnapshot.docs.map((doc) => {
          return ({
            ...doc.data(),
            id: doc.id,
          })})
        );
    },
    error: () => {
      const msg = "Error getting bloggers list";
      callback && callback(new Error(msg));
    },
  });
};

const getArticleCategories = async () => {
  const { docs } = await db.collection(COLLECTION).get();
  return docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getArticleCategory = async (id) => {
  const docs = (await db.collection(COLLECTION).doc(id).get()).data();
  return docs;
};

const addNewArticleCategory = (context, data) => {
  return db.collection(COLLECTION).add({
    translations: {
      [context]: {
        title: data.title,
        description: data.description
      }
    },
    show: data.show,
    icon: data.icon,
    template: data.template

  });
};

const updateCategory = (id, context ,data) => {
  db.collection(COLLECTION).doc(id).set({
    translations: {
      sv: {
        title: data.title,
        description: data.description
      }
    },
    show: data.show,
    icon: data.icon,
    template: data.template
  }, { merge: true });
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

const deleteCategory = (id) => {
  db.collection(COLLECTION).doc(id).delete();
};

export default {
  getArticleCategories,
  getArticleCategory,
  subscribeToArticleCategoriesList,
  addNewArticleCategory,
  deleteCategory,
  flagDeleted,
  updateCategory
};

