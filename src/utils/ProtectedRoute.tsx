import {Navigate} from "react-router-dom";
import React from "react";
import {checkIfLoggedIn} from ".";

interface ProtectedRouteProps {
    children:JSX.Element
}

const ProtectedRoute = ({children}:ProtectedRouteProps) => {
  if (!checkIfLoggedIn()) {
    return (
      <Navigate
        replace
        to="/"
      />);
  }
  return children;
};
export default ProtectedRoute;
