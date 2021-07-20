import React from "react";
import "../styles.css";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
const UpdateProduct = () => {
  const [formData, setformData] = React.useState({
    name: "",
    desc: "",
    quant: "",
    price: "",
    shipping: "",
    photo: "",
    category: [],
  });
  const [file, setfile] = React.useState();
  const [previewfilesrc, setpreviewfilesrc] = React.useState();
  const handlechange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    // setfile(event.target.files[0]);

    previewfile(file);
  };

  const previewfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewfilesrc(reader.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="main_content_two">
      {" "}
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
          name="price"
          placeholder="price"
          value={formData.price || ""}
          required
          onChange={handlechange}
        ></input>

        <select id="product_input" name="category">
          <option id="product_input_val" value="volvo">
            Volvo
          </option>
        </select>

        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
      <DashBoardFooter />
    </div>
  );
};

export default UpdateProduct;
