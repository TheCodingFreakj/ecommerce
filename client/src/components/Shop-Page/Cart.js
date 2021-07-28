import React from "react";
import "./style.css";
const Cart = () => {
  let firstArray = [];
  let firstArrayr = [];
  let showitems = "";
  const [items, setitems] = React.useState("");
  React.useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let cartprice = JSON.parse(localStorage.getItem("cartprice"));
    let filtereditems = JSON.parse(localStorage.getItem("filtereditems"));
    filtereditems.map((items) => {
      firstArray = [...cart, ...cartprice, ...items];
    });
    setitems(firstArray);
  }, []);

  showitems = items ? (
    items.map((arr) => {
      return (
        <>
          <div className="cart_items">
            <h3>{arr.name}</h3>
            <div className="dic_inner">
              quantity: {arr.quant}
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
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
        <div className="class_cart-inners">{showitems}</div>
        <button>Buy</button>
      </div>
    </React.Fragment>
  );
};

export default Cart;
