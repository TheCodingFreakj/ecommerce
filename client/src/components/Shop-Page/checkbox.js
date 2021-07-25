import React from "react";
import "./style.css";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setchecked] = React.useState([]);

  const handleToggle = (c) => () => {
    const currentcatid = checked.indexOf(c); //return first element in which given element is found in array or -1 uf not fodn
    const newcheckedcatid = [...checked];
    if (currentcatid === -1) {
      newcheckedcatid.push(c);
    } else {
      newcheckedcatid.splice(currentcatid, 1);
    }

    // console.log(newcheckedcatid);
    setchecked(newcheckedcatid);
    handleFilters(newcheckedcatid);
  };
  return categories
    ? categories.map((c, i) => {
        return (
          <li key={i} className="list-unstyled">
            <input
              onChange={handleToggle(c.cat_id)}
              value={checked.indexOf(c.cat_id === -1)}
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
          </li>
        );
      })
    : null;
};

export default CheckBox;
