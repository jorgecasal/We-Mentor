import React, { useState, useEffect } from "react";

import firebase from "../firebase";

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false
};

export const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

export const FirebaseAuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(defaultFirebaseContext);
  const { isUserSignedIn, authStatusReported } = authState;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setAuthState({
        authStatusReported: true,
        isUserSignedIn: !!user
      });
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{ isUserSignedIn, authStatusReported }}
    >
      {authStatusReported && children}
    </FirebaseAuthContext.Provider>
  );
};
