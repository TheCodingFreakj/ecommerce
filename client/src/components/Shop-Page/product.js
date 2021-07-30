import React from "react";
import "./style.css";
import CheckBox from "./checkbox";
import axios from "axios";
import RadioBox from "./radiobox";
import { prices } from "./prices";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, cartSelector } from "../../store/cart";
const FilterProducts = () => {
  const productsselected = useSelector(cartSelector).items;
  console.log(productsselected);
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

  const cartdispatch = useDispatch();
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

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
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
                              onClick={() => cartdispatch(addToBasket(c))}
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
                            onClick={() => cartdispatch(addToBasket(fp))}
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
                            onClick={() => cartdispatch(addToBasket(pp))}
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
//https://blog.logrocket.com/returning-null-from-setstate-in-react-16-5fdb1c35d457/
//https://egghead.io/lessons/react-adding-a-button-that-dispatches-an-action-to-redux-to-remove-an-item-from-the-shoppingcart?utm_source=rss&utm_medium=feed&utm_campaign=rss_feed
