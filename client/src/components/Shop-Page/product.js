import React from "react";
import "./style.css";
import CheckBox from "./checkbox";
import axios from "axios";
import RadioBox from "./radiobox";
import { prices } from "./prices";
import { NavLink, Redirect } from "react-router-dom";
import { addItem } from "./CartHelper/cart_helpers";
const FilterProducts = () => {
  const [cat, setcat] = React.useState("");
  const [pro, setpro] = React.useState("");
  const [limit, setlimit] = React.useState(3);
  const [skip, setskip] = React.useState(0);
  const [page, setpage] = React.useState(0);
  const [isloading, setisloading] = React.useState(false);
  const [filteredresults, setfilteredresults] = React.useState("");
  const [filteredresultsp, setfilteredresultsp] = React.useState("");
  const [myfilters, setmyfilters] = React.useState({
    filters: { category: [], price: [] },
  });
  const [filtereditems, setfiltereditems] = React.useState({
    cart: "",
  });

  const [cartprice, setcartprice] = React.useState({
    cart: "",
  });

  const [cartitems, setcartitems] = React.useState({
    cart: "",
  });
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    const showall = async () => {
      const response = axios({
        method: "get",
        url: `http://localhost:8080/api/v1/fetchAll`,
      }).then((data) => {
        setcat(data.data.allcats);
      });
    };

    showall();

    //https://www.freecodecamp.org/news/build-a-react-application-with-load-more-functionality-react-hooks/

    showallP();
  }, []);

  const showallP = async () => {
    setisloading(true);
    const response = axios({
      method: "get",
      url: `http://localhost:8080/api/v1/getallp?page=${page}&result=4`,
    }).then((data) => {
      setpro(data.data.allp);
      setisloading(false);
    });
  };

  const loadFilteredResults = async (skip, limit, newFilters) => {
    const response = await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/listBySearch`,
      data: {
        limit: limit,
        newFilters: newFilters,
        skip: skip,
      },
    });

    if (response.status === 200) {
      setfilteredresults(response.data.thecats[0]);
      setfilteredresultsp(response.data.theproducts[0]);
    }
  };

  const handleFilters = (filters, filterBy) => {
    const newfilters = { ...myfilters };
    newfilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let pricevalues = handlePrice(filters);
      newfilters.filters[filterBy] = pricevalues;
    }

    loadFilteredResults(skip, limit, myfilters.filters);
    setmyfilters(newfilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (const key in data) {
      if (data[key].id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const loadMore = () => {
    setpage(page + 1);
    showallP();
  };
  // console.log("pro", pro);
  // console.log("filteredresults", filteredresults);
  // console.log("filteredresultsp", filteredresultsp);
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const addtocart = (id) => {
    let product = Object.assign({}, pro ? pro.find((p) => p.id == id) : null);

    product.cartId = Date.now();

    setcartitems((prevState) => {
      return {
        cart: [...prevState.cart, product],
      };
    });

    let uniqueArray = cartitems.cart
      ? cartitems.cart.filter(
          (elem, index) =>
            cartitems.cart.findIndex((obj) => obj.id === elem.id) === index
        )
      : null;

    console.log("uniqueArray", uniqueArray);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(uniqueArray));
    }
  };

  const addtocartfilteredp = (id) => {
    let filteredproductp = Object.assign(
      {},
      filteredresultsp ? filteredresultsp.find((p) => p.id == id) : null
    );

    filteredproductp.cartId = Date.now();

    setcartprice((prevState) => {
      return {
        cart: [...prevState.cart, filteredproductp],
      };
    });

    let uniqueArray4 = cartprice.cart
      ? cartprice.cart.filter(
          (elem, index) =>
            cartprice.cart.findIndex((obj) => obj.id === elem.id) === index
        )
      : null;

    console.log("uniqueArray4", uniqueArray4);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartprice", JSON.stringify(uniqueArray4));
    }
  };

  const addtocartfiltered = (id) => {
    const filteredproduct = filteredresults
      ? filteredresults.map((p) => {
          return p.Products.find((pr) => pr.id == id);
        })
      : null;

    // console.log(filteredproduct);

    setfiltereditems((prevState) => {
      return {
        cart: [...prevState.cart, filteredproduct],
      };
    });

    console.log(filtereditems);

    let uniqueArray2 = filtereditems.cart
      ? filtereditems.cart[0].filter(
          (elem, index) =>
            filtereditems.cart[0].findIndex((obj) => obj.id === elem.id) ===
            index
        )
      : null;

    console.log("uniqueArray2", uniqueArray2);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "filtereditems",
        JSON.stringify(filtereditems.cart)
      );
    }
  };
  return (
    <>
      <div className="product_content">
        <div className="left-side">
          <h4>Filter By Category</h4>
          <ul>
            <CheckBox
              categories={cat}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter By Price</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="right-side">
          {/* {shouldRedirect(redirect)} */}
          <>
            {filteredresults
              ? filteredresults.map((f) => {
                  return f.Products.map((c) => {
                    return (
                      <div className="smallcard">
                        <img src={c.photo} className="image_card" />

                        <div className="smallcard-inner">
                          <h2>{c.name}</h2>
                          <p>{c.desc}</p>
                          <p>{c.price}INR</p>

                          <div className="btn_cart_cover">
                            <NavLink
                              className="link"
                              to={`/products/${c.id}`}
                              exact
                            >
                              Shop
                            </NavLink>

                            <button
                              className="button"
                              onClick={() => addtocartfiltered(c.id)}
                            >
                              <span>Add To Cart </span>
                            </button>
                            {showStock(c.quant)}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })
              : null}

            {filteredresultsp
              ? filteredresultsp.map((fp) => {
                  return (
                    <div className="smallcard">
                      <img src={fp.photo} className="image_card" />

                      <div className="smallcard-inner">
                        <h2>{fp.name}</h2>
                        <p>{fp.desc}</p>
                        <p>{fp.price}INR</p>

                        <div className="btn_cart_cover">
                          <NavLink
                            className="link"
                            to={`/products/${fp.id}`}
                            exact
                          >
                            Shop
                          </NavLink>

                          <button
                            className="button"
                            onClick={() => addtocartfilteredp(fp.id)}
                          >
                            <span>Add To Cart </span>
                          </button>
                          {showStock(fp.quant)}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}

            {pro
              ? pro.map((pp) => {
                  return (
                    <div className="smallcard">
                      <img src={pp.photo} className="image_card" />

                      <div className="smallcard-inner">
                        <h2>{pp.name}</h2>
                        <p>{pp.desc}</p>
                        <p>{pp.price}INR</p>

                        <div className="btn_cart_cover">
                          <NavLink
                            className="link"
                            to={`/products/${pp.id}`}
                            exact
                          >
                            Shop
                          </NavLink>

                          <button
                            className="button"
                            onClick={() => addtocart(pp.id)}
                          >
                            Add To Cart
                          </button>

                          {showStock(pp.quant)}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </>
        </div>
      </div>
      {pro && (
        <div className="load-more">
          <button onClick={loadMore} className="btn-grad">
            {isloading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default FilterProducts;
