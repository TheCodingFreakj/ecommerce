import React from "react";
import "../styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
import { addproduct } from "../../store/product";
import { adminSelector } from "../../store/admin";
import { unwrapResult } from "@reduxjs/toolkit";

const CreateProduct = () => {
  const productdispatch = useDispatch();

  const stateadmin = useSelector(adminSelector).token;
  const [formData, setformData] = React.useState({
    name: "",
    desc: "",
    quant: "",
    price: "",
    photo: "",
    sold: "",
  });
  const [file, setfile] = React.useState();
  const [previewfilesrc, setpreviewfilesrc] = React.useState();
  const [cat_name, setcat_name] = React.useState("");
  const [cate, setcate] = React.useState("");
  const [shipping, setshipping] = React.useState("");
  const [error, seterror] = React.useState();
  const [message, setmessage] = React.useState();
  React.useEffect(() => {
    const showall = async () => {
      const response = axios({
        method: "get",
        url: `http://localhost:8080/api/v1/fetchAll`,
      }).then((data) => {
        setcat_name(data.data.allcats);
      });
    };

    showall();
  }, []);
  const handlechange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    // setfile(event.target.files[0]);
    setfile(file);
  };

  const previewfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewfilesrc(reader.result);
    };
  };

  const handlecategories = (e) => {
    setcate(e.target.value);
  };

  const handleshipping = (e) => {
    setshipping(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("photo", file);
    data.append("name", formData.name);
    data.append("quant", formData.quant);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("shipping", shipping);
    data.append("category", cate);
    data.append("sold", formData.sold);

    try {
      const awlp = await productdispatch(addproduct({ data, stateadmin }));
      const originalPromiseResultp = unwrapResult(awlp);

      setmessage(originalPromiseResultp.data.message);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.message);
    }
  };

  return (
    <div className="main_content_two">
      <form className="form_product" onSubmit={handleSubmit}>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={onFileChange}
        />

        {previewfile && (
          <img
            src={previewfilesrc}
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <input
          type="text"
          id="product_input"
          name="name"
          placeholder="name"
          value={formData.name || ""}
          required
          onChange={handlechange}
        ></input>

        <input
          type="text"
          id="product_input_desc"
          name="desc"
          placeholder="desc"
          value={formData.desc || ""}
          required
          onChange={handlechange}
        ></input>

        <input
          type="number"
          id="product_input"
          name="quant"
          placeholder="quant"
          value={formData.quant || ""}
          required
          onChange={handlechange}
        ></input>
        <input
          type="number"
          id="product_input"
          name="sold"
          placeholder="sold"
          value={formData.sold || ""}
          required
          onChange={handlechange}
        ></input>
        <input
          type="number"
          id="product_input"
          name="price"
          placeholder="price"
          value={formData.price || ""}
          required
          onChange={handlechange}
        ></input>
        <select id="product_input" name="catagory" onChange={handlecategories}>
          <option id="product_input_val">choose</option>
          {cat_name
            ? cat_name.map((cata) => {
                return (
                  <>
                    <option
                      id="product_input_val"
                      key={cata.cat_id}
                      value={cata.cat_id}
                    >
                      {cata.name}
                    </option>
                  </>
                );
              })
            : null}
        </select>

        <select id="product_input" name="shipping" onChange={handleshipping}>
          <option id="product_input_val">choose</option>
          <option id="product_input_val" value="true">
            yes
          </option>

          <option id="product_input_val" value="false">
            no
          </option>
        </select>

        <input type="submit" className="btn btn-primary" value="Add" />
        {error ? <h1>{error}</h1> : null}
        {message ? <h1>{message}</h1> : null}
      </form>
      <DashBoardFooter />
    </div>
  );
};

export default CreateProduct;
