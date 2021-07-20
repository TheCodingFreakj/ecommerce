import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import { customerSelector } from "../../store/customer";
const PrivateCustomerRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector(customerSelector);
  console.log(token);
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

export default PrivateCustomerRoute;
