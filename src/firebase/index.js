import firebaseConfig from "../config";
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");
require("firebase/functions");
firebase.initializeApp(firebaseConfig);

export default firebase;
