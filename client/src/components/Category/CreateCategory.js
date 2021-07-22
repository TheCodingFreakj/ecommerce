import React from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
import {
  addcategory,
  deletecategory,
} from "../../store/category";
import axios from "axios";
import { adminSelector } from "../../store/admin";
const CreateCategory = () => {
  const stateadmin = useSelector(adminSelector).token;
  const deletedispatch = useDispatch();
  const createdispatch = useDispatch();
  const [cat_name, setcat_name] = React.useState("");
  const [cat, setcat] = React.useState("");
  const [error, seterror] = React.useState();
  const [message, setmessage] = React.useState();
  const handlechange = (e) => {
    setcat_name(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const awl2 = await createdispatch(addcategory({ cat_name, stateadmin }));
      const originalPromiseResult2 = unwrapResult(awl2);
      console.log(originalPromiseResult2);
      setmessage(originalPromiseResult2.data.message);
      window.location.reload();
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.message);
    }
  };

  React.useEffect(() => {
    const showall = async () => {
      const response = axios({
        method: "get",
        url: `http://localhost:8080/api/v1/fetchAll`,
      }).then((data) => {
        console.log(data);
        setcat(data.data.allcats);
      });
    };

    showall();
  }, []);

  const deleteitem = async (cat_id) => {
    try {
      const awldel = await deletedispatch(
        deletecategory({ cat_id, stateadmin })
      );
      const originalPromiseResultdel = unwrapResult(awldel);
      console.log(originalPromiseResultdel);
      setmessage(originalPromiseResultdel.data.message);
      window.location.reload();
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      // seterror(rejectedValueOrSerializedError.message);
    }
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

        {error ? <h1>{error}</h1> : null}
        {message ? <h1>{message}</h1> : null}
      </div>
      <div className="main_content_4">
        {cat
          ? cat.map((ca) => {
              return (
                <div className="categories" key={ca.id}>
                  <h2>{ca.name}</h2>
                  <button
                    className="categories"
                    onClick={() => deleteitem(ca.id)} //passing the slug we want to delete
                    value={ca.id}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : null}
      </div>

      <DashBoardFooter />
    </>
  );
};

export default CreateCategory;
