import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import { adminSelector } from "../../store/admin";
const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(adminSelector).token;

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
