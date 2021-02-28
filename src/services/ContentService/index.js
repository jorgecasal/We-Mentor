/* eslint-disable no-useless-escape */
import firebase from "../../firebase";

import { slugify } from "../../utils/slugify";

const COLLECTION = "content";

const getContentList = async () => {
  try {
    const { docs } = await firebase
      .firestore()
      .collection(COLLECTION)
      .get();

    return docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (ex) {
    console.log(ex);
    throw new Error("Unable to get content list");
  }
};

const subscribeToContentList = callback => {
  // returns an unsubscribe function for cleanup
  return firebase
    .firestore()
    .collection(COLLECTION)
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

const addNewContent = name => {
  let id = slugify(name);
  console.log("adding", id);
  return firebase
    .firestore()
    .collection("content")
    .doc(id)
    .set({
      originalName: name,
      createdAt: new Date()
    })
    .then(() => {
      return id;
    })
    .catch(ex => {
      console.log(ex);
      throw new Error("Unable to create document");
    });
};

const getContentRef = id =>
  firebase
    .firestore()
    .collection(COLLECTION)
    .doc(id);

const getEditorContent = (contentRef, language) =>
  contentRef
    .collection("editorContent")
    .doc(language)
    .get();

const saveEditorContent = (contentRef, language, data) =>
  contentRef
    .collection("editorContent")
    .doc(language)
    .set(data, { merge: true });

const updateEditorContentName = (contentRef, language, name) =>
  contentRef
    .collection("editorContent")
    .doc(language)
    .set(
      {
        name
      },
      { merge: true }
    );

const flagDeleted = (id, deleted = true) =>
  firebase
    .firestore()
    .collection("content")
    .doc(id)
    .set(
      {
        deleted
      },
      {
        merge: true
      }
    );

const deleteContent = id => {
    firebase.firestore().collection("content").doc(id).delete();
};

export default {
  getContentList,
  subscribeToContentList,
  addNewContent,
  getContentRef,
  getEditorContent,
  saveEditorContent,
  updateEditorContentName,
  flagDeleted,
  deleteContent
};
