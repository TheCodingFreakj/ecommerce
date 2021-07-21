import React from "react";
import "../styles.css";
import { signupCustomer } from "../../store/customer";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
const CustomerSign = () => {
  const registerdispatch = useDispatch();
  const [formData, setformData] = React.useState({
    email: "",
    password: "",
    username: "",
    role: "2",
  });

  const [error, seterror] = React.useState();

  let history = useHistory();
  let location = useLocation();

  const handlechange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const awl2 = await registerdispatch(signupCustomer(formData));
      const originalPromiseResult2 = unwrapResult(awl2);

      console.log(originalPromiseResult2);
      let { from } = location.state || {
        from: { pathname: "/dashboard" },
      };

      history.replace(from);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.message);
    }
  };
  return (
    <>
      <div className="main_content">
        {error ? <h1>{error}</h1> : null}
        <form className="form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            required
            onChange={handlechange}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            required
            onChange={handlechange}
          ></input>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            required
            onChange={handlechange}
          ></input>

          <input type="submit" className="favorite styled" />
        </form>
      </div>
      <DashBoardFooter />
    </>
  );
};

export default CustomerSign;
