import e from "cors";
import React from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
import { addcategory, categorySelector } from "../../store/category";
import { adminSelector } from "../../store/admin";
const CreateCategory = () => {
  const result = useSelector(categorySelector);
  const token = useSelector(adminSelector).token;

  const createdispatch = useDispatch();
  const [cat_name, setcat_name] = React.useState("");
  const [error, seterror] = React.useState();
  const [message, setmessage] = React.useState();
  const handlechange = (e) => {
    setcat_name(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const awl2 = await createdispatch(addcategory(cat_name, token));
      const originalPromiseResult2 = unwrapResult(awl2);

      setmessage(result.message);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.message);
    }
  };

  return (
    <>
      <div className="main_content_3">
        {error ? <h1>{error}</h1> : null}
        {message ? <h1>{message}</h1> : null}
        <form className="form_cat" onSubmit={handleSubmit}>
          <input
            type="text"
            id="product_input"
            name="cat_name"
            placeholder="cat_name"
            value={cat_name || ""}
            required
            onChange={handlechange}
          ></input>

          <input type="submit" className="btn btn-primary" value="Add" />
        </form>
      </div>
      <div className="main_content_4">View all categories</div>

      <DashBoardFooter />
    </>
  );
};

export default CreateCategory;
