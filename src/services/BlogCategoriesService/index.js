/* eslint-disable no-useless-escape */
import firebase from "../../firebase";

const COLLECTION = "categories";

const subscribeToCategories = (callback) => {
  // returns an unsubscribe function for cleanup
  return firebase
    .firestore()
    .collection(COLLECTION)
    .onSnapshot({
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
        const msg = "Error getting blog categories list";
        callback && callback(new Error(msg));
      },
    });
};

const getCategories = async () => {
  const { docs } = await firebase.firestore().collection(COLLECTION).get();
  return docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

 const addNewCategory = (id, categoryNameEn, categoryNameSv) => {
   return firebase
   .firestore()
   .collection(COLLECTION)
   .add({
     id: id,
     promoted: false,
     translations: {
       en: categoryNameEn,
       sv: categoryNameSv
     },
   });
 };

 const deleteCategory = async (id) => {
  return firebase
  .firestore()
  .collection(COLLECTION)
  .doc(id)
  .delete()
};


export default {
  getCategories,
    subscribeToCategories,
    addNewCategory,
    deleteCategory
};
