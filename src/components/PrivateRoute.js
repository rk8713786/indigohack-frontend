import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useFlight } from "../Contexts/Flights";
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useFlight();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
