import e from "cors";
import React from "react";
import "../styles.css";

import DashBoardFooter from "../Dashboard/DashBoardFooter";
const CreateCategory = () => {
  const [cat_name, setcat_name] = React.useState("");
  const handlechange = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updatecat = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="main_content_3">
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

        <form className="form_cat" onSubmit={updatecat}>
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
