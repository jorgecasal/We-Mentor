import firebase from "../../firebase";

const subscribeToCheckistCategories = (language, callback) => {
  // returns an unsubscribe function for cleanup
  return firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .orderBy("sortOrder")
    .onSnapshot({
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
        const msg = "Error getting content list";
        callback && callback(new Error(msg));
      }
    });
};

const getCategories = language =>
  firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .orderBy("sortOrder")
    .get()
    .then(querySnapshot => {
      const addCategories = [];
      querySnapshot.forEach(doc => {
        const category = doc.data();
        category.id = doc.id;
        addCategories.push(category);
      });
      return addCategories;
    });

const getContent = (language, contentId) =>
  firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .doc(contentId)
    .get();

const addCategory = (language, categoryName, sortOrder) =>
  firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .add({
      name: categoryName,
      intro: "",
      tasks: [],
      sortOrder
    });

const updateCategory = (language, category) => {
  const docRef = firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .doc(category.id);
  return docRef.update(category);
};

const deleteChecklist = (language, checklistId) =>
  firebase
    .firestore()
    .collection("checklists")
    .doc(language)
    .collection("content")
    .doc(checklistId)
    .delete();

export default {
  subscribeToCheckistCategories,
  getCategories,
  getContent,
  addCategory,
  updateCategory,
  deleteChecklist
};
