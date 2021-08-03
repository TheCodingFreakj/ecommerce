import React from "react";
import "./style.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeitem, updateCart, cartSelector } from "../../store/cart";
import { customerSelector } from "../../store/customer";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const Cart = () => {
  const [total, settotal] = React.useState(0);
  const [paymentdata, setpaymentdata] = React.useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const [Error, setError] = React.useState();
  const customertoken = useSelector(customerSelector).token;
  const customer = useSelector(customerSelector).user;
  const removeitemdispatch = useDispatch();
  const updatequamdispatch = useDispatch();
  const productsselected = useSelector(cartSelector).items;
  const handleChange = (e, arr) => {
    let quant = e.target.value;
    updatequamdispatch(updateCart({ arr, quant }));
    let quantityarr = [];
    let sum = "";
    const tquantity = productsselected
      ? productsselected.map((singleproduct) => {
          console.log(singleproduct.quant);
          let price = Number(singleproduct.quant) * Number(singleproduct.price);
          quantityarr.push(Number(price));
          sum = quantityarr.reduce(function (accumulator, current) {
            return accumulator + current;
          });

          settotal(sum);
        })
      : null;
  };

  let showitems = "";

  showitems = productsselected ? (
    productsselected.map((arr) => {
      return (
        <>
          <div className="cart_items">
            <h3>{arr.name}</h3>

            <div className="cart_items_infor">
              <div className="dic_inner" key={arr.id}>
                {/* avalaible: {arr.quant} */}
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

  const handleCheckout = async () => {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/api/v1/braintree/getToken/${customer.id}`,
      headers: {
        contentType: "application/json",
        authorization: ` Bearer ${customertoken}`,
      },
    });

    setpaymentdata({ ...paymentdata, clientToken: response.data.clientToken });
  };

  React.useEffect(() => {
    handleCheckout();
  });

  const buy = () => {
    //send the nonce to server
    let nonce;
    let getnonce = paymentdata.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentdatasent = {
          paymentMethodNonce: nonce,
          amounfromclient: total,
        };
        const response = axios({
          method: "post",
          url: `http://localhost:8080/api/v1/braintree/payment/${customer.id}`,
          paymentdatasent,
          headers: {
            contentType: "application/json",
            authorization: ` Bearer ${customertoken}`,
          },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const showDropin = () => (
    <div>
      {paymentdata.clientToken !== null && productsselected.length > 0 ? (
        <div onBlur={() => setError("")}>
          <button className="button_checkout" onClick={buy}>
            checkout
          </button>
          <DropIn
            options={{
              authorization: paymentdata.clientToken,
            }}
            onInstance={(instance) => (paymentdata.instance = instance)}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <div className="class_cart">
        <h2>Cart Items</h2>
        <div className="class_cart-inners">
          {productsselected ? (
            <div>
              {Error ? <h3>{Error}</h3> : null}
              {showitems}
              <div className="footer_cart">
                <h1>Subtotal</h1>
                <h3>{total}</h3>
              </div>

              {customertoken ? (
                <>
                  <div>{showDropin()}</div>
                </>
              ) : (
                <div className="link_checkout">
                  <NavLink to={`/login-customer`} exact>
                    Login
                  </NavLink>
                </div>
              )}
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

// arr.quant = quant;
// console.log(arr);
// updated.splice(updated.length - 1, 0, arr);
// console.log(updated);

// let upadetdquanp = updated.map((ind) => {
//   let updatedpricecal = ind.quant * ind.price;
//   return updatedpricecal;
// });

// yourGlobalVariable = removeduplicates(upadetdquanp).reduce(
//   (total, amount) => total + amount
// );
// console.log(yourGlobalVariable);
// setstoreval(yourGlobalVariable);
