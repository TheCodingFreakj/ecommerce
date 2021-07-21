import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminSelector } from "../../store/admin";
import { customerSelector } from "../../store/customer";
const Navlinks = () => {
  let stateadmin = useSelector(adminSelector).token;
  let stateadminuser = useSelector(adminSelector).user;
  let statecustomer = useSelector(customerSelector).token;
  // console.log(statecustomer);
  // console.log(stateadminuser);
  let history = useHistory();
  let location = useLocation();

  const logout = async () => {
    statecustomer = null;

    let { from } = location.state || {
      from: { pathname: "/" },
    };

    history.replace(from);
  };

  const logoutadmin = async () => {
    stateadmin = null;
    stateadminuser = null;
    let { from } = location.state || {
      from: { pathname: "/" },
    };

    history.replace(from);
  };
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/customer-register">register Customer</NavLink>
        <NavLink to="/login-customer">Customer Login</NavLink>

        <NavLink to="/home" exact>
          Home
        </NavLink>

        <NavLink to="/products" exact>
          Products
        </NavLink>
        {stateadmin.token ? (
          <NavLink to="/admin-register">register Admin</NavLink>
        ) : null}
        <NavLink to="/login-admin"> Admin Login</NavLink>
        <button onClick={logoutadmin}>signout admin</button>
        <button onClick={logout}>signout customer</button>
      </li>
    </ul>
  );
};

export default Navlinks;
