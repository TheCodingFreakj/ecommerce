import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
const DashBoardMenu = () => {
  return (
    <div className="flex_item_menu">
      <div className="menu">
        <ul className="menu_bullet">
          <li className="menu_bullet_one">
            <NavLink to="/dashboard/create_p">Create Product</NavLink>
          </li>

          <li className="menu_bullet_one">
            <NavLink to="/dashboard/show_p">Show Products</NavLink>
          </li>
          <li className="menu_bullet_one">
            <NavLink to="/dashboard/createupdate_c">Create category</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardMenu;
