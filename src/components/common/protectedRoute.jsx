import React from "react";
import { Route, Redirect } from "react-router";
import { currentUser } from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser())
          return (
            <Redirect
              to={{
                pathname: "/signIn",
                state: { from: props.location.pathname },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
