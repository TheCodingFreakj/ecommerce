import React from "react";
import "../styles.css";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
import { adminSelector } from "../../store/admin";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import axios from "axios";
import {
  showproduct,
  productSelector,
  updateproduct,
} from "../../store/product";
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
  const prod_id = useParams().prod_id;
  let stateproduct = useSelector(productSelector).products;
  console.log(stateproduct);

  const productviewdispatch = useDispatch();
  const productupdatedispatch = useDispatch();
  const [formData, setformData] = React.useState({
    name: "",
    desc: "",
    quant: "",
    price: "",
    shipping: "",
    photo: "",
  });

  const { name, desc, quant, price, shipping, photo } = formData;
  const [cat_name, setcat_name] = React.useState("");
  const [cate, setcate] = React.useState("");
  // const [shipping, setshipping] = React.useState("");
  const [file, setfile] = React.useState();
  const [error, seterror] = React.useState();
  const [prod, setprod] = React.useState();
  const [previewfilesrc, setpreviewfilesrc] = React.useState();
  const handlechange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setfile(file);
  };

  console.log(file);

  const previewfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewfilesrc(reader.result);
    };
  };
  const stateadmin = useSelector(adminSelector).token;
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
  React.useEffect(() => {
    const viewProduct = async () => {
      try {
        const viewP = await productviewdispatch(
          showproduct({ prod_id, stateadmin })
        );
        const result = unwrapResult(viewP);

        setformData({
          name: result.data.theProd.name ? result.data.theProd.name : "",
          desc: result.data.theProd.desc ? result.data.theProd.desc : "",
          quant: result.data.theProd.quant ? result.data.theProd.quant : "",
          price: result.data.theProd.price ? result.data.theProd.price : "",
          photo: result.data.theProd.photo ? result.data.theProd.photo : "",
          shipping: result.data.theProd.shipping
            ? result.data.theProd.shipping
            : "",
        });
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.log(rejectedValueOrSerializedError);
        seterror(rejectedValueOrSerializedError.data);
      }
    };

    viewProduct();

    if (!prod) {
      return;
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", file);
    //https://medium.com/@alex067/react-updating-image-src-the-right-way-2fd41b09075d
    data.append("name", name);
    data.append("quant", quant);
    data.append("desc", desc);
    data.append("price", price);
    data.append("shipping", shipping);
    data.append("category", cate);
    try {
      const viewPU = await productupdatedispatch(
        updateproduct({ data, prod_id, stateadmin })
      );
      const result = unwrapResult(viewPU);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.data);
    }
  };

  const handlecategories = (e) => {
    setcate(e.target.value);
  };
  return (
    <div className="main_content_two">
      <form className="form_product" onSubmit={handleSubmit}>
        <input
          type="file"
          id="photo"
          placeholder="upload new image"
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
          value={name}
          required
          onChange={handlechange}
        ></input>

        <input
          type="text"
          id="product_input_desc"
          name="desc"
          placeholder="desc"
          value={desc}
          required
          onChange={handlechange}
        ></input>

        <input
          type="number"
          id="product_input"
          name="quant"
          placeholder="quant"
          value={quant}
          required
          onChange={handlechange}
        ></input>

        <input
          type="number"
          id="product_input"
          name="price"
          placeholder="price"
          value={price}
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

        <select id="product_input" name="shipping" onChange={handlechange}>
          <option id="product_input_val">choose</option>
          <option id="product_input_val" value="true">
            yes
          </option>

          <option id="product_input_val" value="false">
            no
          </option>
        </select>

        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
      <DashBoardFooter />
    </div>
  );
};

export default UpdateProduct;
