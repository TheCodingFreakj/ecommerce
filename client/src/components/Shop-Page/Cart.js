import React from "react";
import "./style.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeitem, addToBasket, cartSelector } from "../../store/cart";
const Cart = () => {
  const removeitemdispatch = useDispatch();
  const updatedispatch = useDispatch();
  const productsselected = useSelector(cartSelector).items;
  console.log(productsselected);
  // React.useState(() => {});

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  let showitems = "";

  showitems = productsselected ? (
    productsselected.map((arr) => {
      return (
        <>
          <div className="cart_items">
            <h3>{arr.name}</h3>

            <div className="cart_items_infor">
              <div className="dic_inner">
                avalaible: {arr.quant}
                <select
                  name="quant"
                  id="quant"
                  onChange={(e) => handleChange(e)}
                >
                  <option name="1" value="1">
                    1
                  </option>
                  <option name="2" value="2">
                    2
                  </option>
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
