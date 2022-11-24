import React from "react";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ Component, loggedIn, ...props }) => {
  return loggedIn ? <Component {...props} /> : <Redirect to="/signin" />;
};
