import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminSelector } from "../../store/admin";
const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  let stateadmin = useSelector(adminSelector).token;
  //console.log(stateadmin);

  return (
    <Route
      {...rest}
      render={(props) =>
        stateadmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login-admin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
