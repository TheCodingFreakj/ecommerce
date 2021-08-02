import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import { customerSelector } from "../../store/customer";
const PrivateCustomerRoute = ({ component: Component, ...rest }) => {


  let statecustomer = useSelector(customerSelector).token;
  console.log(statecustomer);
  return (
    <Route
      {...rest}
      render={(props) =>
        statecustomer ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login-customer", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateCustomerRoute;



