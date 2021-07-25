import React from "react";
import "./style.css";
import CheckBox from "./checkbox";
import axios from "axios";
import RadioBox from "./radiobox";
import { prices } from "./prices";

const FilterProducts = () => {
  const [cat, setcat] = React.useState("");
  const [limit, setlimit] = React.useState(3);
  const [skip, setskip] = React.useState(0);
  const [filteredresults, setfilteredresults] = React.useState("");
  const [filteredresultsp, setfilteredresultsp] = React.useState("");
  const [myfilters, setmyfilters] = React.useState({
    filters: { category: [], price: [] },
  });
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
  }, []);

  const loadFilteredResults = async (skip, limit, newFilters) => {
    setfilteredresults(filteredresults);
    const response = await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/listBySearch`,
      data: {
        limit: limit,
        newFilters: newFilters,
        skip: skip,
      },
    });

    console.log(response);
    if (response.status === 200) {
      setfilteredresults(response.data.thecats[0]);
      setfilteredresultsp(response.data.theproducts[0]);
    }
  };

  // console.log(filteredresults);

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

  return (
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
          {filteredresults ? (
            filteredresults.map((f) => {
              console.log(f);
              return f.Products.map((c) => {
                return (
                  <div className="smallcard">
                    <img src={c.photo} className="image" />

                    <div className="smallcard-inner">
                      <h2>{c.name}</h2>
                      <p>{c.desc}</p>
                      <button>shop</button>
                    </div>
                  </div>
                );
              });
            })
          ) : (
            <p>loading</p>
          )}

          {filteredresultsp ? (
            filteredresultsp.map((fp) => {
              return (
                <div className="smallcard">
                  <img src={fp.photo} className="image" />

                  <div className="smallcard-inner">
                    <h2>{fp.name}</h2>
                    <p>{fp.desc}</p>
                    <button>shop</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </>
      </div>
    </div>
  );
};

export default FilterProducts;
