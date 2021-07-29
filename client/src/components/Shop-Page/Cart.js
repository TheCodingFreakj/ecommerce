import React from "react";
import "./style.css";
const Cart = () => {
  let firstArray = [];
  let showitems = "";
  let filtereditems = [];
  const [items, setitems] = React.useState("");
  React.useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let cartprice = JSON.parse(localStorage.getItem("cartprice"));
    filtereditems = JSON.parse(localStorage.getItem("filtereditems"));

    if (filtereditems) {
      return filtereditems.map((items) => {
        firstArray = [...cart, ...cartprice, ...items];
        setitems(firstArray);
        console.log(firstArray);
      });
    }
  }, []);
  console.log(items);

  showitems = items ? (
    items.map((arr) => {
      console.log(arr);
      return (
        <>
          <div className="cart_items">
            <h3>{arr.name}</h3>
            <div className="dic_inner">
              quantity: {arr.quant}
              <select name="quant" id="quant">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <p> price: {arr.price}</p>
          </div>
        </>
      );
    })
  ) : (
    <p>Loading</p>
  );

  return (
    <React.Fragment>
      <div className="class_cart">
        <h2>Cart Items</h2>
        <div className="class_cart-inners">
          {showitems ? (
            <div>
              {showitems}
              <button>Buy</button>
            </div>
          ) : (
            <div>Fill Up the cart</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
