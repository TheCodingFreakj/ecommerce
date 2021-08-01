import React from "react";
import "./style.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeitem, addToBasket, cartSelector } from "../../store/cart";

var yourGlobalVariable = [];
const Cart = () => {
  const removeitemdispatch = useDispatch();
  const productsselected = useSelector(cartSelector).items;
  const [storeval, setstoreval] = React.useState([]);
  let updated = [];
  // var yourGlobalVariable;

  const handleChange = (e, arr) => {
    let quant = e.target.value;
    arr.quant = quant;
    updated.splice(updated.length - 1, 0, arr);
    console.log(updated);

    let upadetdquanp = updated.map((ind) => {
      let updatedpricecal = ind.quant * ind.price;
      return updatedpricecal;
    });

    yourGlobalVariable = removeduplicates(upadetdquanp).reduce(
      (total, amount) => total + amount
    );
    console.log(yourGlobalVariable);
  };

  const removeduplicates = (arr) => {
    return arr.filter((value, index) => arr.indexOf(value) === index);
  };

  console.log(yourGlobalVariable);

  let showitems = "";

  showitems = productsselected ? (
    productsselected.map((arr) => {
      return (
        <>
          <div className="cart_items" key={arr.id}>
            <h3>{arr.name}</h3>

            <div className="cart_items_infor">
              <div className="dic_inner">
                avalaible: {arr.quant}
                <select
                  name="quant"
                  id="quant"
                  onChange={(e) => handleChange(e, arr)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10+">10+</option>
                </select>
              </div>
              <p>
                price: {arr.price}
                <span>
                  <button
                    className="btn"
                    onClick={() =>
                      removeitemdispatch(removeitem(arr, productsselected))
                    }
                  >
                    X
                  </button>
                </span>
              </p>
            </div>
          </div>

          <hr />
          <hr />
          <hr />
        </>
      );
    })
  ) : (
    <NavLink className="link" to={`/product`} exact>
      Fill the cart
    </NavLink>
  );

  return (
    <React.Fragment>
      <div className="class_cart">
        <h2>Cart Items</h2>
        <div className="class_cart-inners">
          {productsselected ? (
            <div>
              {showitems}
              <div className="footer_cart">Subtotal</div>
            </div>
          ) : (
            <NavLink className="link" to={`/product`} exact>
              Fill the cart
            </NavLink>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;

//to remove
//https://dev.to/papasanto/build-a-react-hooks-shopping-cart-with-usestate-and-useeffect-39hk
