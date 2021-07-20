import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { adminSelector } from "../../store/admin";
// import { customerSelector } from "../../store/customer";
const Navlinks = () => {
  let stateadmin = useSelector(adminSelector);
  // let statecustomer = useSelector(customerSelector);

  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
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

        <button onClick={logout}>signout</button>
      </li>
    </ul>
  );
};

export default Navlinks;
