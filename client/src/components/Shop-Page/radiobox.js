import React from "react";
import "./style.css";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setvalue] = React.useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setvalue(e.target.value);
  };
  return prices
    ? prices.map((p, i) => {
        return (
          <div key={i} className="v-unstyled">
            <input
              onChange={handleChange}
              value={p.id}
              name={p}
              type="radio"
              className="form-check-input"
            />
            <label className="form-check-label">{p.name}</label>
          </div>
        );
      })
    : null;
};

export default RadioBox;
