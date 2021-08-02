import React from "react";
import "../styles.css";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { loginCustomer } from "../../store/customer";
import { useSelector, useDispatch } from "react-redux";

import { customerSelector } from "../../store/customer";
import { unwrapResult } from "@reduxjs/toolkit";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
const CustomerLogin = () => {
  const logindispatch = useDispatch();
  const [error, seterror] = React.useState();
  console.log(useSelector(customerSelector));
  const [logindata, setlogindata] = React.useState({
    email: "",
    password: "",
  });

  const loginhandlechange = (e) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  let history = useHistory();
  let location = useLocation();

  const handleloginSubmit = async (e) => {
    e.preventDefault();

    try {
      const awl = await logindispatch(loginCustomer(logindata));
      const originalPromiseResult = unwrapResult(awl);
      console.log(originalPromiseResult);

      let { from } = location.state || {
        from: { pathname: "/cart" },
      };

      history.replace(from);
    } catch (rejectedValueOrSerializedError) {
      seterror(rejectedValueOrSerializedError.message);
    }
  };
  return (
    <>
      <div className="main_content">
        {error ? <p>{error}</p> : null}
        <form className="form" onSubmit={handleloginSubmit}>
          <label>email</label>
          <input
            type="text"
            name="email"
            value={logindata.email || ""}
            required
            onChange={loginhandlechange}
          ></input>

          <label>Password</label>
          <input
            type="text"
            name="password"
            value={logindata.password || ""}
            required
            onChange={loginhandlechange}
          ></input>

          <input type="submit" className="favorite styled" />
        </form>
      </div>

      <DashBoardFooter />
    </>
  );
};

export default CustomerLogin;
