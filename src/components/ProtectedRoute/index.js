import React from "react";
import { Redirect, Route } from "react-router-dom";
import { FirebaseAuthContext } from "../../context/FirebaseAuthProvider";

export const ProtectedRoute = props => {
  return (
    <FirebaseAuthContext.Consumer>
      {({ isUserSignedIn }) => {
        if (isUserSignedIn) {
          return <Route {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    </FirebaseAuthContext.Consumer>
  );
};
